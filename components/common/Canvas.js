import { useEffect, useRef } from "react";

export default function Canvas({ draw, ...rest }) {
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...rest} />;
}

export const useCanvas = (draw) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        let animationFrameId;
        const render = () => {
            draw(context, canvas);
            animationFrameId = window.requestAnimationFrame(render);
        };

        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);
    return canvasRef;
};

export function resizeCanvasToDisplaySize(canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }
}
