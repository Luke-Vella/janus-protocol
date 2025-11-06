"use client";

import React from "react";
import classes from "./modal.module.css";

interface ModalProps extends React.PropsWithChildren {
  onClick?: () => void;
}

function Modal(props: ModalProps) {
  return (
    <>
      <div onClick={props.onClick} className={classes.backdrop}></div>
      <dialog
        open
        className="flex z-10 flex-col p-6 rounded-md shadow-md bg-white dark:bg-gray-800 m-auto w-full md:w-1/2"
      >
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
