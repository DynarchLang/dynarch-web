import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../lib/api';
import {
  Package,
  Download,
  Star,
  Clock,
  Search,
  TrendingUp,
  Shield,
  Zap,
  Code,
  Database,
  Network,
  FileText,
} from 'lucide-react';
import { PackageCard } from '../ui/PackageCard';

export function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [packagesRef, packagesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    fetchWithAuth('/packages')
      .then((data) => setPackages(data))
      .catch((error) => console.error('Failed to fetch packages:', error));
  }, []);

  const iconMap: Record<string, any> = {
    Network,
    FileText,
    Shield,
    Database,
    Zap,
    Code,
  };

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'network', label: 'Networking' },
    { id: 'data', label: 'Data Structures' },
    { id: 'security', label: 'Security' },
    { id: 'dev-tools', label: 'Dev Tools' },
    { id: 'text', label: 'Text Processing' },
  ];

  const popularPackages = packages.slice(0, 3);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-6xl font-bold mb-6 text-white">
              Falcon Packages
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Discover and install packages from the Dynarch ecosystem
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm text-white placeholder:text-white/50"
              />
            </div>

            <div className="mt-6 p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white">Install with Falcon</h3>
                  <code className="text-sm text-white/90 bg-black/30 px-3 py-1 rounded">
                    falcon install package-name
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Trending This Week</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularPackages.map((pkg, index) => {
              const Icon = iconMap[pkg.icon] || Package;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{pkg.name}</h3>
                  <p className="text-sm text-white/70 mb-4">{pkg.description}</p>

                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {pkg.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {pkg.stars}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`px-5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* All Packages */}
      <section ref={packagesRef} className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages
              .filter((pkg) => category === 'all' || pkg.category === category)
              .filter((pkg) => 
                pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((pkg, index) => {
              const Icon = iconMap[pkg.icon] || Package;
              return (
                <PackageCard key={pkg.name} delay={index * 0.05} inView={packagesInView}>
                  <div className="h-full p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold mb-1 text-white group-hover:text-cyan-200 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-white/50 mb-3">v{pkg.version}</p>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2 h-10">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 text-xs text-white/60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {pkg.downloads}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {pkg.stars}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated {pkg.updated}
                      </div>
                    </div>
                  </div>
                </PackageCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
