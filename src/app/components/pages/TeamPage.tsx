import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Users, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { TeamCard } from '../ui/TeamCard';

export function TeamPage() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [coreRef, coreInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contributorsRef, contributorsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const coreTeam = [
    {
      name: 'Mahmut Yılmaz',
      role: 'Creator & Lead Architect',
      bio: 'System programming enthusiast with a passion for building efficient, elegant languages',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      github: 'mahmut',
      twitter: 'mahmut_dev',
      linkedin: 'mahmutyilmaz',
    },
    {
      name: 'Sarah Chen',
      role: 'Compiler Engineer',
      bio: 'Optimization wizard and LLVM expert, making Dynarch blazing fast',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      github: 'sarahchen',
      twitter: 'sarah_compiles',
      linkedin: 'sarahchen',
    },
    {
      name: 'Alex Rodriguez',
      role: 'Standard Library Lead',
      bio: 'Crafting rock-solid APIs and libraries for the Dynarch ecosystem',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      github: 'alexrod',
      twitter: 'alex_codes',
      linkedin: 'alexrodriguez',
    },
    {
      name: 'Emma Watson',
      role: 'Developer Relations',
      bio: 'Building bridges between the language and its amazing community',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      github: 'emmaw',
      twitter: 'emma_devrel',
      linkedin: 'emmawatson',
    },
  ];

  const topContributors = [
    {
      name: 'Michael Zhang',
      contributions: 248,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      github: 'mzhang',
    },
    {
      name: 'Lisa Kumar',
      contributions: 187,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      github: 'lisakumar',
    },
    {
      name: 'David Park',
      contributions: 156,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      github: 'dpark',
    },
    {
      name: 'Sophie Martin',
      contributions: 143,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
      github: 'sophiem',
    },
    {
      name: 'James Wilson',
      contributions: 128,
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
      github: 'jwilson',
    },
    {
      name: 'Nina Patel',
      contributions: 114,
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
      github: 'ninapatel',
    },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-6xl font-bold mb-6 text-white">
              Meet The Team
            </h1>
            <p className="text-xl text-white/80">
              The talented people behind Dynarch and our amazing community contributors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Team */}
      <section ref={coreRef} className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={coreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Core Team</h2>
            <p className="text-white/70 text-lg">
              The people who make Dynarch possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {coreTeam.map((member, index) => (
              <TeamCard key={member.name} delay={index * 0.1} inView={coreInView}>
                <div className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-sm text-cyan-300 mb-3">{member.role}</p>
                    <p className="text-sm text-white/70 mb-4 line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex items-center gap-3">
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group/icon"
                      >
                        <Github className="w-4 h-4 group-hover/icon:scale-110 transition-transform" />
                      </a>
                      <a
                        href={`https://twitter.com/${member.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group/icon"
                      >
                        <Twitter className="w-4 h-4 group-hover/icon:scale-110 transition-transform" />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group/icon"
                      >
                        <Linkedin className="w-4 h-4 group-hover/icon:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </TeamCard>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section ref={contributorsRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contributorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-400 fill-red-400" />
              <h2 className="text-4xl font-bold text-white">Top Contributors</h2>
            </div>
            <p className="text-white/70 text-lg">
              Community heroes who make Dynarch better every day
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {topContributors.map((contributor, index) => (
              <motion.div
                key={contributor.name}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={
                  contributorsInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="relative w-24 h-24 rounded-full mx-auto border-2 border-white/10 group-hover:border-white/30 transition-colors"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold">
                    {contributor.contributions}
                  </div>
                </div>

                <h4 className="font-semibold mb-1 text-white group-hover:text-cyan-200 transition-colors">
                  {contributor.name}
                </h4>
                <a
                  href={`https://github.com/${contributor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/60 hover:text-white/90 transition-colors flex items-center justify-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  @{contributor.github}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={contributorsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Want to Contribute?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Dynarch is open source and we welcome contributions from everyone.
                Whether you're fixing bugs, adding features, or improving documentation,
                we'd love to have you on board!
              </p>
              <motion.a
                href="https://github.com/dynarch-lang/dynarch"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-semibold"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
