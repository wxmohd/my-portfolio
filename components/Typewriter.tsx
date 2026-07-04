'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  words,
  className = '',
  typingSpeed = 90,
  deletingSpeed = 40,
  pauseDuration = 1800,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), pauseDuration);
    } else if (deleting && display === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setDisplay(word.substring(0, display.length + (deleting ? -1 : 1))),
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {display}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}
