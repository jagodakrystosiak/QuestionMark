import React from "react";
import "./Modal.css"

export default function({children, isOpen, onClose, title}) {
    const close = () => {
        onClose();
    }

    return (
        <div className={`modal ${isOpen ? ' modal--active' : ''}`}>
            <div>
                <span className="modal__content" onClick={close}>&times;</span>
                <h3 className="title">{title}</h3>
                {children}
            </div>
        </div>
    )
}