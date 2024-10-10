import { useEffect, useRef } from "react";

export function useOutsideClick(handleClose, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("outside");
          handleClose();
          //   close();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handleClose, listenCapturing]
  );
  return ref;
}
