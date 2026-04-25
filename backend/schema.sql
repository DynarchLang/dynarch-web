-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum Threads table
CREATE TABLE IF NOT EXISTS forum_threads (
    id SERIAL PRIMARY KEY,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'open',
    replies INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    excerpt TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum Tags table
CREATE TABLE IF NOT EXISTS forum_tags (
    thread_id INTEGER REFERENCES forum_threads(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (thread_id, tag)
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    version VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    downloads INTEGER DEFAULT 0,
    stars INTEGER DEFAULT 0,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Optional, using a dummy user)
DO $$
DECLARE
    dummy_user_id UUID;
BEGIN
    -- Check if seed user exists, if not create one
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'system') THEN
        INSERT INTO users (username, email, password_hash) 
        VALUES ('system', 'system@dynarch.com', 'dummy_hash_not_usable')
        RETURNING id INTO dummy_user_id;
    ELSE
        SELECT id INTO dummy_user_id FROM users WHERE username = 'system';
    END IF;

    -- Seed forum threads if table is empty
    IF NOT EXISTS (SELECT 1 FROM forum_threads LIMIT 1) THEN
        INSERT INTO forum_threads (author_id, title, category, status, replies, views, likes, excerpt) VALUES
        (dummy_user_id, 'Memory leak when using alloc() in loop', 'Bug', 'open', 12, 234, 8, 'I noticed that when calling alloc() inside a for loop without proper free(), the memory usage keeps growing...'),
        (dummy_user_id, 'How to implement custom allocators?', 'Question', 'solved', 5, 189, 15, 'Looking for best practices on implementing custom memory allocators in Dynarch. Any examples?'),
        (dummy_user_id, 'Feature request: String interpolation improvements', 'Feature', 'open', 31, 678, 45, 'Would be great to have more flexible string interpolation like nested expressions...');
        
        -- Tags for thread 1
        INSERT INTO forum_tags (thread_id, tag) VALUES (1, 'memory'), (1, 'stdlib');
        -- Tags for thread 2
        INSERT INTO forum_tags (thread_id, tag) VALUES (2, 'memory'), (2, 'advanced');
        -- Tags for thread 3
        INSERT INTO forum_tags (thread_id, tag) VALUES (3, 'feature'), (3, 'syntax');
    END IF;

    -- Seed packages if table is empty
    IF NOT EXISTS (SELECT 1 FROM packages LIMIT 1) THEN
        INSERT INTO packages (name, version, description, author_id, downloads, stars, category, icon, color) VALUES
        ('http-server', '2.1.0', 'High-performance HTTP server implementation with zero-copy I/O', dummy_user_id, 15200, 342, 'network', 'Network', 'from-blue-400 to-cyan-500'),
        ('json-parser', '1.8.3', 'Fast and memory-efficient JSON parsing library', dummy_user_id, 28500, 567, 'data', 'FileText', 'from-green-400 to-emerald-500'),
        ('crypto', '3.0.1', 'Cryptographic primitives and secure hashing algorithms', dummy_user_id, 12800, 289, 'security', 'Shield', 'from-purple-400 to-pink-500');
    END IF;
END $$;
