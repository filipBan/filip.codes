import { useCallback, useEffect, useRef } from "react";
import Canvas, { resizeCanvasToDisplaySize } from "@components/common/Canvas";
import { init, addNewRandomParticle } from "@components/hunters/init";
import { checkCollisions } from "@components/hunters/helpers";
import ControlPanel from "@components/hunters/ControlPanel";
import useState from "@components/hunters/state";

import styles from "@components/hunters/hunters.module.css";

export default function Hunters() {
    const particleArray = useRef([]);
    const [state, dispatch, types] = useState();

    useEffect(() => {
        particleArray.current = init(state);
    }, []);

    const drawCallback = useCallback((ctx, canvas) => {
        resizeCanvasToDisplaySize(canvas);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        particleArray.current.forEach((particle) =>
            particle.update(ctx, canvas)
        );

        if (particleArray.current.length === 1) {
            particleArray.current = init(state);
        }

        checkCollisions(particleArray.current, ctx);
    }, []);

    const handleCanvasClick = useCallback(
        (e) =>
            addNewRandomParticle({
                x: e.clientX,
                y: e.clientY,
                array: particleArray.current,
                config: state,
            }),
        []
    );

    return (
        <div>
            <Canvas
                className={styles.canvas}
                draw={drawCallback}
                onClick={handleCanvasClick}
            />
            <ControlPanel
                restartCanvas={() => (particleArray.current = init(state))}
                state={state}
                dispatch={dispatch}
                types={types}
            />
        </div>
    );
}
