import React, { useEffect } from "react";

export default function AnimationWrapper({
  id,
  isOpen,
  animate,
  animation = {
    in: "fadeIn",
    out: "fadeOut",
    duration: "1s",
  },
  children,
}) {
  useEffect(() => {
    const el = document.querySelector(`.${id}`);
    el.style.setProperty("--animate-duration", animation.duration);
  }, [animation.duration, id]);

  return (
    <>
      {isOpen ? (
        <div className={`${id} animate__animated animate__${animation.in}`}>
          {children}
        </div>
      ) : (
        <div className={`${id} animate__animated animate__${animation.out}`}>
          {animate && children}
        </div>
      )}
    </>
  );
}
