import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { FileText, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import { BlogCard } from '../ui/BlogCard';

export function BlogPage() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [postsRef, postsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const blogPosts = [
    {
      id: 1,
      title: 'Dynarch 3.0: The Future of System Programming',
      excerpt: 'Introducing groundbreaking features that make low-level programming more accessible while maintaining zero-cost abstractions...',
      author: 'Core Team',
      date: 'April 20, 2026',
      readTime: '8 min',
      category: 'Release',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      featured: true,
    },
    {
      id: 2,
      title: 'Memory Management Best Practices',
      excerpt: 'Learn the patterns and techniques for writing memory-safe code in Dynarch without sacrificing performance...',
      author: 'Sarah Mitchell',
      date: 'April 18, 2026',
      readTime: '12 min',
      category: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 3,
      title: 'Building High-Performance Web Servers',
      excerpt: 'A deep dive into creating blazing-fast HTTP servers using Dynarch zero-copy I/O and async primitives...',
      author: 'Alex Zhang',
      date: 'April 15, 2026',
      readTime: '15 min',
      category: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 4,
      title: 'Optimizing Compiler Output',
      excerpt: 'Understand how the Dynarch compiler optimizes your code and how to write optimization-friendly programs...',
      author: 'Michael Roberts',
      date: 'April 12, 2026',
      readTime: '10 min',
      category: 'Deep Dive',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 5,
      title: 'Cross-Platform Development Guide',
      excerpt: 'Best practices for writing portable Dynarch code that runs seamlessly across Windows, Linux, and macOS...',
      author: 'Emma Wilson',
      date: 'April 10, 2026',
      readTime: '7 min',
      category: 'Guide',
      image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 6,
      title: 'Community Spotlight: Amazing Projects',
      excerpt: 'Showcasing incredible projects built with Dynarch by our talented community members...',
      author: 'Community Team',
      date: 'April 8, 2026',
      readTime: '6 min',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
      featured: false,
    },
  ];

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-6xl font-bold mb-6 text-white">
              Blog
            </h1>
            <p className="text-xl text-white/80">
              Stories, tutorials, and insights from the Dynarch team and community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Featured Post</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span>
                    </div>

                    <h2 className="text-4xl font-bold mb-4 text-white group-hover:text-cyan-200 transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-lg text-white/80 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-white/60 mb-8">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} read
                      </div>
                      <span>{featuredPost.date}</span>
                    </div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-white font-semibold"
                    >
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section ref={postsRef} className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-white">Recent Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.id} delay={index * 0.1} inView={postsInView}>
                <div className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 z-10" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.category === 'Tutorial'
                          ? 'bg-blue-500/30 text-blue-300 backdrop-blur-sm'
                          : post.category === 'Deep Dive'
                          ? 'bg-purple-500/30 text-purple-300 backdrop-blur-sm'
                          : post.category === 'Guide'
                          ? 'bg-green-500/30 text-green-300 backdrop-blur-sm'
                          : 'bg-orange-500/30 text-orange-300 backdrop-blur-sm'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-white/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/60 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="text-xs text-white/50 mt-2">{post.date}</div>
                  </div>
                </div>
              </BlogCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              Load More Posts
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
