import { useEffect, useRef } from "react";
import { getWidthFromCursorPosition } from "./helpers";
import styles from "./hunters.module.css";

export default function Slider({ title, setter, container, data }) {
    const isSliding = useRef(false);

    function slide(e) {
        if (isSliding.current) {
            e.preventDefault();
            adjustSlider(e);
        }
    }

    function stopSliding() {
        isSliding.current = false;
    }

    function startSliding(e) {
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
        window.addEventListener("mousemove", slide);
        window.addEventListener("mouseup", stopSliding);
        window.addEventListener("touchmove", slide);
        window.addEventListener("touchend", stopSliding);

        return () => {
            window.removeEventListener("mousemove", slide);
            window.removeEventListener("mouseup", stopSliding);
            window.removeEventListener("touchmove", slide);
            window.removeEventListener("touchend", stopSliding);
        };
    }, []);

    return (
        <div>
            <span>{title}</span>
            <div
                onMouseDown={startSliding}
                onTouchStart={startSliding}
                className={styles.slider}
            >
                <div
                    className={styles.sliderRow}
                    style={{ width: `${data.width}%` }}
                />
            </div>
            <div>{data.value}</div>
        </div>
    );
}
