"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface BlackButtonProps {
  text: string;
  href: string;
}

export default function BlackButton({ text, href }: BlackButtonProps) {
  const [gradientStyle, setGradientStyle] = useState({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (buttonRef.current) {
      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = ((event.clientX - left) / width) * 100;
      const y = ((event.clientY - top) / height) * 100;

      setGradientStyle({
        background: `radial-gradient(circle at ${x}% ${y}%, #89B08B, #000000)`,
      });
    }
  };

  useEffect(() => {
    const buttonElement = buttonRef.current;

    if (buttonElement) {
      buttonElement.addEventListener("mousemove", handleMouseMove);

      return () =>
        buttonElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <Link href={href} passHref target="_blank">
      <button
        ref={buttonRef}
        style={gradientStyle}
        className="relative inline-block font-handwriting font-semibold text-lg md:text-2xl text-off-white bg-black hover:bg-[#706F6B] transition-colors duration-500 ease-in-out px-3 py-1 md:px-6 md:py-2 mt-4 border-[0.5px] border-black-grey rounded-md shadow-lg after:absolute after:-bottom-[4px] after:-right-[4px] after:w-[calc(100%+4px)] after:h-[calc(100%+4px)] after:border-b-4 after:border-r-4 after:border-black-grey after:rounded-md after:bg-off-black after:z-[-1]"
      >
        {text}
      </button>
    </Link>
  );
}
