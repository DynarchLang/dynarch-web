import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function AnimatedCode() {
  const [visibleLines, setVisibleLines] = useState(0);

  const codeLines = [
    { indent: 0, text: '@load <io.hdy>' },
    { indent: 0, text: '' },
    { indent: 0, text: 'fun fibonacci(int n) -> int {' },
    { indent: 1, text: 'if n <= 1 {' },
    { indent: 2, text: 'return n;' },
    { indent: 1, text: '}' },
    { indent: 1, text: 'return fibonacci(n - 1) + fibonacci(n - 2);' },
    { indent: 0, text: '}' },
    { indent: 0, text: '' },
    { indent: 0, text: 'fun main() -> int {' },
    { indent: 1, text: 'printf("Fibonacci(10) = {fibonacci(10)}");' },
    { indent: 1, text: 'return 0;' },
    { indent: 0, text: '}' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < codeLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateX: -20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1, type: 'spring' }}
      className="relative perspective-2000"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-3xl blur-2xl opacity-60" />

      <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/20 bg-black/40 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg" />
          <span className="ml-4 text-sm text-white/70 font-mono font-semibold">fibonacci.dy</span>
        </div>

        <div className="p-8 font-mono text-base overflow-x-auto">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={
                index < visibleLines
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.3 }}
              className="leading-relaxed"
              style={{ paddingLeft: `${line.indent * 2}rem` }}
            >
              {line.text === '' ? (
                <span>&nbsp;</span>
              ) : (
                <CodeLine text={line.text} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CodeLine({ text }: { text: string }) {
  const keywords = ['fun', 'int', 'if', 'return', '@load'];
  const strings = text.match(/"[^"]*"/g) || [];
  const functions = text.match(/\w+(?=\()/g) || [];

  let highlighted = text;

  strings.forEach((str) => {
    highlighted = highlighted.replace(
      str,
      `<span class="text-green-400">${str}</span>`
    );
  });

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(
      regex,
      `<span class="text-purple-400">${keyword}</span>`
    );
  });

  functions.forEach((func) => {
    if (!keywords.includes(func)) {
      const regex = new RegExp(`\\b${func}(?=\\()`, 'g');
      highlighted = highlighted.replace(
        regex,
        `<span class="text-blue-400">${func}</span>`
      );
    }
  });

  highlighted = highlighted.replace(/\{|\}/g, '<span class="text-yellow-400">$&</span>');
  highlighted = highlighted.replace(/<[^>]+>/g, (match) => {
    if (match.startsWith('<span')) return match;
    return `<span class="text-cyan-400">${match}</span>`;
  });

  return (
    <span
      className="text-white/90"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
