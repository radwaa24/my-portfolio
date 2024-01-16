import React from "react";
import ReactPortal from "./portal";
import { useEffect } from "react";

function Modal({children, isOpen, onClose}) {

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    zIndex: 1000,
  };


  useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [onClose]);

  

  return (
    <ReactPortal id="react-portal-modal-container">
      	  <div style ={overlayStyles}  onClick={onClose}/>    
        {children}
    </ReactPortal>
  )
}
export default Modal;