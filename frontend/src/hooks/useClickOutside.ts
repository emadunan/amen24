import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useClickOutside = (
  elRef: RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (elRef.current && !elRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
};

export default useClickOutside;
