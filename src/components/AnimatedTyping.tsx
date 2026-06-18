import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../constants/animations';

interface AnimatedTypingProps {
  words: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

/**
 * Types each word character-by-character, pauses, then backspaces smoothly.
 * Clean state machine — no recursive setTimeout inside state updaters.
 */
export default function AnimatedTyping({
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  pauseDuration = 1800,
}: AnimatedTypingProps) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const charIdx = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(words[wordIdx]);
      const timer = setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % words.length);
      }, 2500);
      return () => clearTimeout(timer);
    }

    let timer: ReturnType<typeof setTimeout>;
    const currentWord = words[wordIdx];

    if (phase === 'typing') {
      if (charIdx.current < currentWord.length) {
        timer = setTimeout(() => {
          charIdx.current += 1;
          setText(currentWord.slice(0, charIdx.current));
        }, typeSpeed);
      } else {
        // Word fully typed — pause
        timer = setTimeout(() => setPhase('pausing'), pauseDuration);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (charIdx.current > 0) {
        timer = setTimeout(() => {
          charIdx.current -= 1;
          setText(currentWord.slice(0, charIdx.current));
        }, deleteSpeed);
      } else {
        // Fully deleted — move to next word
        setWordIdx((prev) => (prev + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, wordIdx, words, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center">
      <span className="text-accent">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 translate-y-[0.1em]"
      />
    </span>
  );
}
