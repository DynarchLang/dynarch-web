package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var jwtKey = []byte("dynarch_super_secret_key_123") // In production, this should be in an environment variable

// --- Models ---

type User struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"created_at"`
}

type Thread struct {
	ID        int       `json:"id"`
	AuthorID  string    `json:"author_id"`
	Author    string    `json:"author"`
	Title     string    `json:"title"`
	Category  string    `json:"category"`
	Status    string    `json:"status"`
	Replies   int       `json:"replies"`
	Views     int       `json:"views"`
	Likes     int       `json:"likes"`
	Excerpt   string    `json:"excerpt"`
	Timestamp string    `json:"timestamp"` // Formatted relative time
	Tags      []string  `json:"tags"`
	CreatedAt time.Time `json:"created_at"`
}

type Package struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Version     string    `json:"version"`
	Description string    `json:"description"`
	AuthorID    string    `json:"author_id"`
	Author      string    `json:"author"`
	Downloads   int       `json:"downloads"`
	Stars       int       `json:"stars"`
	Category    string    `json:"category"`
	Icon        string    `json:"icon"`
	Color       string    `json:"color"`
	Updated     string    `json:"updated"` // Formatted relative time
	UpdatedAt   time.Time `json:"updated_at"`
}

type Claims struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// --- Middleware ---

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("username", claims.Username)
		c.Next()
	}
}

// --- Handlers ---

// Auth

func Register(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}

	var userID string
	err = db.QueryRow(
		"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
		input.Username, input.Email, string(hashedPassword),
	).Scan(&userID)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username or email already exists"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully", "user_id": userID})
}

func Login(c *gin.Context) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user User
	err := db.QueryRow("SELECT id, username, password_hash FROM users WHERE username = $1", input.Username).
		Scan(&user.ID, &user.Username, &user.PasswordHash)

	if err != nil || bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID:   user.ID,
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

func Me(c *gin.Context) {
	userID := c.GetString("user_id")
	username := c.GetString("username")
	c.JSON(http.StatusOK, gin.H{"id": userID, "username": username})
}

// Forum

func GetThreads(c *gin.Context) {
	category := c.Query("category")
	
	query := `
		SELECT t.id, t.author_id, u.username, t.title, t.category, t.status, t.replies, t.views, t.likes, t.excerpt, t.created_at
		FROM forum_threads t
		JOIN users u ON t.author_id = u.id
	`
	var rows *sql.Rows
	var err error

	if category != "" && category != "all" {
		query += " WHERE LOWER(t.category) = LOWER($1) ORDER BY t.created_at DESC"
		rows, err = db.Query(query, category)
	} else {
		query += " ORDER BY t.created_at DESC"
		rows, err = db.Query(query)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var threads []Thread
	for rows.Next() {
		var t Thread
		if err := rows.Scan(&t.ID, &t.AuthorID, &t.Author, &t.Title, &t.Category, &t.Status, &t.Replies, &t.Views, &t.Likes, &t.Excerpt, &t.CreatedAt); err != nil {
			log.Println("Error scanning thread:", err)
			continue
		}
		
		// Calculate relative time (simplified)
		diff := time.Since(t.CreatedAt)
		if diff.Hours() < 24 {
			t.Timestamp = fmt.Sprintf("%d hours ago", int(diff.Hours()))
			if diff.Hours() < 1 {
				t.Timestamp = "just now"
			}
		} else {
			t.Timestamp = fmt.Sprintf("%d days ago", int(diff.Hours()/24))
		}

		// Get tags
		tagRows, err := db.Query("SELECT tag FROM forum_tags WHERE thread_id = $1", t.ID)
		if err == nil {
			for tagRows.Next() {
				var tag string
				tagRows.Scan(&tag)
				t.Tags = append(t.Tags, tag)
			}
			tagRows.Close()
		}
		if t.Tags == nil {
			t.Tags = []string{}
		}

		threads = append(threads, t)
	}

	// If no threads, return empty array instead of null
	if threads == nil {
		threads = []Thread{}
	}

	c.JSON(http.StatusOK, threads)
}

func CreateThread(c *gin.Context) {
	userID := c.GetString("user_id")

	var input struct {
		Title    string   `json:"title" binding:"required"`
		Category string   `json:"category" binding:"required"`
		Excerpt  string   `json:"excerpt" binding:"required"`
		Tags     []string `json:"tags"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := db.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}
	defer tx.Rollback()

	var threadID int
	err = tx.QueryRow(
		"INSERT INTO forum_threads (author_id, title, category, excerpt) VALUES ($1, $2, $3, $4) RETURNING id",
		userID, input.Title, input.Category, input.Excerpt,
	).Scan(&threadID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create thread"})
		return
	}

	for _, tag := range input.Tags {
		_, err = tx.Exec("INSERT INTO forum_tags (thread_id, tag) VALUES ($1, $2)", threadID, tag)
		if err != nil {
			log.Println("Failed to insert tag:", err)
		}
	}

	if err := tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Thread created successfully", "id": threadID})
}

// Packages

func GetPackages(c *gin.Context) {
	category := c.Query("category")
	
	query := `
		SELECT p.id, p.name, p.version, p.description, p.author_id, COALESCE(u.username, 'system'), p.downloads, p.stars, p.category, p.icon, p.color, p.updated_at
		FROM packages p
		LEFT JOIN users u ON p.author_id = u.id
	`
	var rows *sql.Rows
	var err error

	if category != "" && category != "all" {
		query += " WHERE LOWER(p.category) = LOWER($1) ORDER BY p.downloads DESC"
		rows, err = db.Query(query, category)
	} else {
		query += " ORDER BY p.downloads DESC"
		rows, err = db.Query(query)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var packages []Package
	for rows.Next() {
		var p Package
		if err := rows.Scan(&p.ID, &p.Name, &p.Version, &p.Description, &p.AuthorID, &p.Author, &p.Downloads, &p.Stars, &p.Category, &p.Icon, &p.Color, &p.UpdatedAt); err != nil {
			log.Println("Error scanning package:", err)
			continue
		}
		
		diff := time.Since(p.UpdatedAt)
		if diff.Hours() < 24 {
			p.Updated = fmt.Sprintf("%d hours ago", int(diff.Hours()))
		} else {
			p.Updated = fmt.Sprintf("%d days ago", int(diff.Hours()/24))
		}

		packages = append(packages, p)
	}

	if packages == nil {
		packages = []Package{}
	}

	c.JSON(http.StatusOK, packages)
}

// --- Main ---

func main() {
	// Database connection
	// Using default postgres user on localhost without password for local dev
	connStr := "user=yigit dbname=dynarch_db sslmode=disable"
	
	// Check if running on linux or mac
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	
	// Test the connection
	err = db.Ping()
	if err != nil {
		// Fallback for different postgres local setup
		connStr = "postgres://postgres:postgres@localhost:5432/dynarch_db?sslmode=disable"
		db, err = sql.Open("postgres", connStr)
		if err != nil {
			log.Fatal(err)
		}
		err = db.Ping()
		if err != nil {
			connStr = "user=postgres dbname=dynarch_db sslmode=disable"
			db, err = sql.Open("postgres", connStr)
			if err != nil {
				log.Fatal(err)
			}
			err = db.Ping()
			if err != nil {
				log.Fatal("Could not connect to database:", err)
			}
		}
	}

	log.Println("Successfully connected to database!")

	// Gin Router
	r := gin.Default()

	// CORS Middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes
	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", Register)
			auth.POST("/login", Login)
			auth.GET("/me", AuthMiddleware(), Me)
		}

		forum := api.Group("/forum")
		{
			forum.GET("/threads", GetThreads)
			forum.POST("/threads", AuthMiddleware(), CreateThread)
		}

		packages := api.Group("/packages")
		{
			packages.GET("/", GetPackages)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
