import React from "react";

export default function ({errors}) {
    return(
        <div>
            {errors.length > 1 ? (
                <ul>
                    {errors.map((error, index) => (
                        <li>{error}</li>
                    ))}
                </ul>
            ): (
                <span>{errors[0]}</span>
            )}
        </div>
    )
}