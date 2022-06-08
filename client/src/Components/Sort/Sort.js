import React from "react";

const compare = (a, b) => {
    return a.content.localCompare(b.content)
};

export default function ({ children, by }) {
    if (!by) {
        return children
    }
    return React.Children.toArray(children).sort(compare)
}