"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursorClassName?: string;
}

export default function Typewriter({
  text,
  delay = 0,
  speed = 50,
  className = "",
  cursorClassName = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText.split("\n").map((line, i, arr) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
      <span
        className={`inline-block w-0.5 h-[1em] bg-white ml-1 align-middle ${cursorClassName}`}
        style={{
          opacity: showCursor ? 1 : 0,
        }}
      />
    </span>
  );
}
