import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { BookOpen, Code, Zap, FileText, Search, ChevronRight } from 'lucide-react';
import { DocCard } from '../ui/DocCard';

export function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contentRef, contentInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      topics: [
        'Installation',
        'First Program',
        'Project Structure',
        'Compiler Basics',
      ],
    },
    {
      id: 'language',
      title: 'Language Basics',
      icon: Code,
      color: 'from-blue-400 to-cyan-500',
      topics: [
        'Variables & Types',
        'Functions',
        'Pointers',
        'Memory Management',
        'Structs & Enums',
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      icon: BookOpen,
      color: 'from-purple-400 to-pink-500',
      topics: [
        'Compiler Rules',
        'Macros',
        'Inline Functions',
        'Type Aliases',
        'Module System',
      ],
    },
    {
      id: 'stdlib',
      title: 'Standard Library',
      icon: FileText,
      color: 'from-green-400 to-emerald-500',
      topics: [
        'io.hdy',
        'mem.hdy',
        'int.hdy',
        'string.hdy',
        'math.hdy',
      ],
    },
  ];

  const codeExamples = {
    'getting-started': `@load <io.hdy>

fun main() -> int {
    printf("Hello, Dynarch!");
    return 0;
}`,
    language: `struct Person {
    string name;
    int age;
}

fun greet(Person $person) -> void {
    printf("Hello, {$person->name}!");
}`,
    advanced: `@rule int validate(int x) {
    if x < 0 {
        @error "Value must be positive"
    }
}

@macro max(a, b) {
    ((a) > (b) ? (a) : (b))
}`,
    stdlib: `@load <mem.hdy>

fun main() -> int {
    int $arr = alloc(10 * sizeof(int));

    for int i = 0; i < 10; i++ {
        arr[i] = i * 2;
    }

    free(arr);
    return 0;
}`,
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section ref={headerRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-black" />
            </div>

            <h1 className="text-6xl font-bold mb-6 text-white">
              Documentation
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Complete guide to mastering Dynarch programming language
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors backdrop-blur-sm text-white placeholder:text-white/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={contentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <div className="space-y-2">
                  {docSections.map((section, index) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;

                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={contentInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-white/10 border border-white/20'
                            : 'bg-white/5 border border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-white">{section.title}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {docSections.map((section) => {
                  if (section.id !== activeSection) return null;

                  const Icon = section.icon;

                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h2 className="text-4xl font-bold text-white">{section.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {section.topics.map((topic, index) => (
                            <DocCard key={index} delay={index * 0.05}>
                              <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 cursor-pointer group">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-white">{topic}</span>
                                  <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            </DocCard>
                          ))}
                        </div>

                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
                          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-black/20">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 text-sm text-gray-500 font-mono">
                              example.dy
                            </span>
                          </div>
                          <pre className="p-6 overflow-x-auto">
                            <code className="text-sm font-mono text-white/90">
                              {codeExamples[section.id as keyof typeof codeExamples]}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
