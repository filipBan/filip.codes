import { useEffect, useRef } from "react";
import { getWidthFromCursorPosition } from "./helpers";
import styles from "./hunters.module.css";

export default function Slider({ title, setter, container, data }) {
    const isSliding = useRef(false);

    function onMouseMove(e) {
        if (isSliding.current) {
            e.preventDefault();
            adjustSlider(e);
        }
    }

    function onMouseUp() {
        isSliding.current = false;
    }

    function onMouseDown(e) {
        isSliding.current = true;
        e.preventDefault();
        adjustSlider(e);
    }

    function adjustSlider(e) {
        const newWidth = getWidthFromCursorPosition(
            e.clientX - container.current.offsetLeft
        );

        setter(newWidth);
    }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div>
            <span>{title}</span>
            <div onMouseDown={onMouseDown} className={styles.slider}>
                <div
                    className={styles.sliderRow}
                    style={{ width: `${data.width}%` }}
                />
            </div>
            <div>{data.value}</div>
        </div>
    );
}
