import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap, Shield, Layers, Terminal, Download, Star, Rocket } from 'lucide-react';
import { Link } from 'react-router';
import { FloatingCard } from '../ui/FloatingCard';
import { AnimatedCode } from '../ui/AnimatedCode';
import { FalconFlightBackground } from '../3d/FalconFlightBackground';
import { Logo } from '../ui/Logo';
import { useState, useEffect } from 'react';

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Compiled to native code with zero-overhead abstractions',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Memory Safe',
      description: 'Manual control with pointer safety and null checking',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Layers,
      title: 'Low-Level',
      description: 'Direct hardware access with C ABI compatibility',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Terminal,
      title: 'Modern Syntax',
      description: 'Clean, readable syntax inspired by modern languages',
      gradient: 'from-green-400 to-emerald-500',
    },
  ];

  const stats = [
    { label: 'GitHub Stars', value: '2.4K', icon: Star },
    { label: 'Packages', value: '150+', icon: Download },
    { label: 'Contributors', value: '45', icon: Terminal },
  ];

  return (
    <div className="relative">
      <FalconFlightBackground scrollProgress={scrollProgress} />

      <div className="relative z-10">
        {/* Hero Section - Enhanced with 3D depth */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

          <div className="container mx-auto px-6 z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-center max-w-6xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1.5, delay: 0.5, type: 'spring', bounce: 0.4 }}
                className="mb-8 inline-block"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
                  <Logo className="relative h-40 w-auto mx-auto drop-shadow-2xl" />
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-8 inline-block"
              >
                <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
                  <span className="text-sm text-white font-semibold flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    System Programming Language - Soar to New Heights
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-8xl font-bold mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Build Systems That
                </span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 1.3 }}
                  className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl"
                >
                  Soar Like Falcons
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-2xl text-white/90 mb-14 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
              >
                Dynarch combines the power of low-level system programming with modern syntax
                and developer ergonomics. Experience freedom in flight with every line of code.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="flex items-center justify-center gap-6"
              >
                <Link to="/docs">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 40px rgba(255,255,255,0.4)',
                      rotateY: 5,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg flex items-center gap-3 group shadow-2xl"
                  >
                    Take Flight
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>

                <Link to="/packages">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 40px rgba(255,255,255,0.2)',
                      rotateY: -5,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl font-bold text-lg text-white hover:bg-white/20 transition-colors shadow-2xl"
                  >
                    Explore Packages
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="mt-28 max-w-5xl mx-auto perspective-2000"
            >
              <AnimatedCode />
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section - Enhanced 3D cards */}
        <section ref={featuresRef} className="py-40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="text-center mb-24"
            >
              <h2 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Why Dynarch?
              </h2>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                Designed for developers who need control without sacrificing productivity
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FloatingCard key={index} delay={index * 0.15} inView={featuresInView}>
                  <motion.div
                    whileHover={{
                      rotateY: 15,
                      rotateX: -15,
                      scale: 1.1,
                      z: 150,
                    }}
                    className="p-10 h-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl hover:border-white/50 hover:shadow-[0_0_60px_rgba(100,200,255,0.4)] transition-all duration-500 shadow-2xl"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed text-lg">{feature.description}</p>
                  </motion.div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced with depth */}
        <section ref={statsRef} className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, rotateX: -30, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.2,
                    rotateY: 15,
                    rotateX: 10,
                    z: 150,
                  }}
                  className="text-center p-16 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl hover:border-white/50 hover:shadow-[0_0_80px_rgba(100,200,255,0.5)] transition-all duration-500 shadow-2xl perspective-1000"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className="w-16 h-16 mx-auto mb-6 text-white/80" />
                  </motion.div>
                  <div className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-2xl font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced final call to action */}
        <section className="py-40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 p-20 text-center backdrop-blur-xl shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />

              <div className="relative z-10">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                >
                  Ready to Soar?
                </motion.h2>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  Join the community of developers building the future with Dynarch.
                  Experience the freedom of flight in system programming.
                </motion.p>
                <Link to="/docs">
                  <motion.button
                    whileHover={{ scale: 1.1, rotateY: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-14 py-6 bg-white text-black rounded-2xl font-bold text-2xl inline-flex items-center gap-4 group shadow-2xl"
                  >
                    Start Your Journey
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
