import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchWithAuth, getAuthUser } from '../../lib/api';
import {
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ThumbsUp,
  Eye,
  Plus,
  Filter,
} from 'lucide-react';
import { ForumCard } from '../ui/ForumCard';

export function ForumPage() {
  const [filter, setFilter] = useState('all');
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [threadsRef, threadsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Question');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newTags, setNewTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [forumThreads, setForumThreads] = useState<any[]>([]);

  useEffect(() => {
    fetchWithAuth('/forum/threads')
      .then((data) => setForumThreads(data))
      .catch((error) => console.error('Failed to fetch threads:', error));
  }, []);

  const categories = [
    { id: 'all', label: 'All Topics', count: forumThreads.length },
    { id: 'bug', label: 'Bugs', count: forumThreads.filter((t) => t.category === 'Bug').length },
    { id: 'question', label: 'Questions', count: forumThreads.filter((t) => t.category === 'Question').length },
    { id: 'feature', label: 'Features', count: forumThreads.filter((t) => t.category === 'Feature').length },
  ];

  const handleNewThreadClick = () => {
    if (!getAuthUser()) {
      navigate('/login');
    } else {
      setIsCreating(!isCreating);
    }
  };

  const handleSubmitThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(t => t.length > 0);
      await fetchWithAuth('/forum/threads', {
        method: 'POST',
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          excerpt: newExcerpt,
          tags: tagsArray
        })
      });
      setIsCreating(false);
      setNewTitle('');
      setNewExcerpt('');
      setNewTags('');
      
      // Refresh threads
      const data = await fetchWithAuth('/forum/threads');
      setForumThreads(data);
    } catch (err) {
      console.error('Failed to create thread', err);
      alert('Failed to create thread. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-6xl font-bold mb-6 text-white">
              Community Forum
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Get help, share ideas, and report bugs with the Dynarch community
            </p>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleNewThreadClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {isCreating ? 'Cancel' : 'New Thread'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Create Form */}
      {isCreating && (
        <section className="py-8 bg-white/5 border-b border-white/10">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Create a New Thread</h2>
            <form onSubmit={handleSubmitThread} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
                <input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  placeholder="Summarize your issue or idea"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="Question">Question</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Tags (comma separated)</label>
                  <input
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    placeholder="e.g. memory, compiler"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Content</label>
                <textarea
                  required
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                  placeholder="Provide more details..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Thread'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  filter === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {category.label}
                <span className="ml-2 opacity-70">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Threads */}
      <section ref={threadsRef} className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-4">
            {forumThreads
              .filter((t) => filter === 'all' || t.category.toLowerCase() === filter)
              .map((thread, index) => (
              <ForumCard key={thread.id} delay={index * 0.05} inView={threadsInView}>
                <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              thread.category === 'Bug'
                                ? 'bg-red-500/20 text-red-300'
                                : thread.category === 'Question'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {thread.category}
                            </span>

                            {thread.status === 'solved' && (
                              <div className="flex items-center gap-1 text-green-400 text-xs">
                                <CheckCircle className="w-4 h-4" />
                                <span>Solved</span>
                              </div>
                            )}

                            {thread.status === 'open' && thread.category === 'Bug' && (
                              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                <AlertCircle className="w-4 h-4" />
                                <span>Open</span>
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-200 transition-colors">
                            {thread.title}
                          </h3>

                          <p className="text-white/70 text-sm mb-3 line-clamp-2">
                            {thread.excerpt}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              by <span className="text-white/90">{thread.author}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {thread.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2 text-white/60">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{thread.replies}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{thread.views}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{thread.likes}</span>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                          {thread.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/5 rounded text-xs text-white/70"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ForumCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              Load More
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
