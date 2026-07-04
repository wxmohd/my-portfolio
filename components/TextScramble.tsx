'use client';

import { useEffect, useState, CSSProperties } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#$%&@01';

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function TextScramble({ text, className = '', style }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    let raf: number;

    const queue = text.split('').map((char, i) => ({
      to: char,
      start: i * 4,
      end: i * 4 + 24,
    }));

    const update = () => {
      let output = '';
      let done = 0;
      for (const q of queue) {
        if (q.to === ' ') {
          output += ' ';
          done++;
        } else if (frame >= q.end) {
          output += q.to;
          done++;
        } else if (frame >= q.start) {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(output);
      frame++;
      if (done < queue.length) {
        raf = requestAnimationFrame(update);
      }
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}
