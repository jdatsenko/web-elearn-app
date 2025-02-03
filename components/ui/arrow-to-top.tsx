import React from "react"; 
import { Button, ButtonProps } from "./button";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ArrowToTop({
  minHeight = 300,
  scrollTo = 0,
  ...props
}: ButtonProps & { minHeight?: number; scrollTo?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset >= minHeight);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [minHeight]);

  return (
    visible && (
      <Button
        onClick={() =>
          window.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          })
        }
        {...props}
      >
        <ArrowUp size={20} />
      </Button>
    )
  );
}
