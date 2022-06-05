import React from "react";
import "./Button.css";

export default function ({children, type, onClick}) {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    )
}