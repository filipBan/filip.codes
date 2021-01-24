import { useRef } from "react";
import Slider from "./Slider";
import styles from "./hunters.module.css";

export default function ControlPanel({
    restartCanvas,
    state,
    dispatch,
    types,
}) {
    const controlPanelRef = useRef(null);

    return (
        <div ref={controlPanelRef} className={styles.controlPanel}>
            <Slider
                title="Number of particles"
                setter={(data) => dispatch({ type: types.particles, data })}
                data={state.particles}
                container={controlPanelRef}
            />
            <Slider
                title="Minimum size"
                setter={(data) => dispatch({ type: types.minSize, data })}
                data={state.minSize}
                container={controlPanelRef}
            />
            <Slider
                title="Maximum size"
                setter={(data) => dispatch({ type: types.maxSize, data })}
                data={state.maxSize}
                container={controlPanelRef}
            />
            <Slider
                title="Minimum speed"
                setter={(data) => dispatch({ type: types.minSpeed, data })}
                data={state.minSpeed}
                container={controlPanelRef}
            />
            <Slider
                title="Maximum speed"
                setter={(data) => dispatch({ type: types.maxSpeed, data })}
                data={state.maxSpeed}
                container={controlPanelRef}
            />
            <div>
                <button onClick={restartCanvas}>Generate</button>
            </div>
        </div>
    );
}
