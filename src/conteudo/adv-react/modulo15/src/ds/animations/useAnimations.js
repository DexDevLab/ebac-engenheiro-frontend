import { useState } from "react";

const useAnimations = (animationDuration = "1s") => {
  const [animate, setAnimate] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const getAnimationDuration = () => {
    if (typeof animationDuration === "string") {
      if (animationDuration.includes("s")) {
        const duration = animationDuration.replace("s", "");
        return Number(duration) * 400;
      }
    }
    return Number(animationDuration) * 400;
  };

  const toggle = () => {
    setOpen(!isOpen);
    setTimeout(() => setAnimate(!animate), getAnimationDuration());
  };

  const open = () => {
    setOpen(true);
    setTimeout(() => setAnimate(false), getAnimationDuration());
  };

  const close = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), getAnimationDuration());
    setOpen(false);
  };

  return { isOpen, animate, open, close, toggle, getAnimationDuration };
};
export default useAnimations;
