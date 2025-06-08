import { useEffect, useState } from "react";
import { Button, useModal } from "../ds";

export default function ModalPartial(props) {
  const { ModalComponent, isOpen, open } = useModal({});
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShowButton(true);
      }, 500);
    } else {
      setShowButton(false);
    }
  }, [isOpen]);

  return (
    <>
      {showButton && <Button onClick={() => open()}>Show Modal</Button>}
      {ModalComponent()}
    </>
  );
}
