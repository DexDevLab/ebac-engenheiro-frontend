import React, { useEffect, useState } from "react";
import AnimationWrapper from "../animations/AnimationWrapper";
import useAnimations from "../animations/useAnimations";
import Box from "../box/Box";
import Button from "../button/Button";
import useCustomBreakpoint from "../globals/useCustomBreakpoint";
import useStyle from "../globals/useStyle";
import useZIndex from "../globals/useZIndex";
import Text from "../text/Text";

const useModal = ({
  id = "modal",
  animation = {
    in: "fadeIn",
    out: "fadeOut",
    duration: "0.7s",
  },
  modalTitle = "Modal Title",
  modalContent,
  variant,
  sx,
  style
}) => {
  const { isOpen, animate, open, close, toggle, getAnimationDuration } =
    useAnimations(animation.duration);
  const { classNameProps, styledProps } = useStyle(
    "modal-box",
    variant,
    false,
    sx,
    style
  );
  const { classNameProps: modalOverlayProps } = useStyle("modal-overlay");
  const { setToBottom, resetZIndex } = useZIndex();
  const ref = React.createRef();
  const { windowWidth, windowHeight, scrollPositionY, scrollPositionX } =
    useCustomBreakpoint("md");
  const [modalBoxSize, setModalBoxSize] = useState({});

  useEffect(() => {
    if (isOpen) {
      setToBottom();
    }
    if (animate) {
      setTimeout(() => resetZIndex(), getAnimationDuration());
    }
  }, [animate, getAnimationDuration, isOpen, resetZIndex, setToBottom]);

  const ModalContentPlaceholder = () => {
    return (
      <>
        <Text sx={"modal-placeholder-text"} style={{ color: 'black', ...styledProps }}></Text>
        <Box dir={"row"} justify={"around"} sx={"modal-placeholder-box"}>
          <Button onClick={() => close()}>Close Modal</Button>
        </Box>
      </>
    );
  };

  useEffect(() => {
    if (ref.current?.offsetWidth > 0 && !modalBoxSize.width > 0) {
      setModalBoxSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [modalBoxSize.width, ref]);

  const ModalComponent = () => {
    return (
      <AnimationWrapper
        id={id}
        isOpen={isOpen}
        animate={animate}
        animation={animation}
      >
        <div
          className={modalOverlayProps}
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
        />
        <div
          ref={ref}
          className={classNameProps}
          style={{
            top: `${
              (windowHeight - modalBoxSize.height) / 2 + scrollPositionY
            }px`,
            left: `${
              (windowWidth - modalBoxSize.width) / 2 + scrollPositionX
            }px`,
            ...styledProps,
          }}
        >
          <Box dir={"row"} justify={"start"} sx={"modal-title-box"}>
            <Text sx={"modal-title-text"} style={{ color: 'black', ...styledProps }}>
              {modalTitle}
            </Text>
          </Box>

          <Box dir={"row"} gap={10} justify={"between"} sx={"modal-content"}>
            {modalContent || ModalContentPlaceholder()}
          </Box>
        </div>
      </AnimationWrapper>
    );
  };

  return { ModalComponent, isOpen, open, close, toggle };
};

export default useModal;
