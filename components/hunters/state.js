import { useReducer } from "react";
import { getWidthFromValue, getInterpolatedValue } from "./helpers";

const baseConfig = {
    minParticles: 10,
    maxParticles: 1000,
    minSize: 0.1,
    maxSize: 5,
    minSpeed: 1,
    maxSpeed: 100,
};

const initialState = {
    particles: {
        min: baseConfig.minParticles,
        max: baseConfig.maxParticles,
        value: 500,
        width: getWidthFromValue(500, baseConfig.maxParticles),
    },
    minSize: {
        min: baseConfig.minSize,
        max: baseConfig.maxSize,
        value: 0.1,
        width: getWidthFromValue(0.1, baseConfig.maxSize),
    },
    maxSize: {
        min: baseConfig.minSize,
        max: baseConfig.maxSize,
        value: 3,
        width: getWidthFromValue(3, baseConfig.maxSize),
    },
    minSpeed: {
        min: baseConfig.minSpeed,
        max: baseConfig.maxSpeed,
        value: 1,
        width: getWidthFromValue(1, baseConfig.maxSpeed),
    },
    maxSpeed: {
        min: baseConfig.minSpeed,
        max: baseConfig.maxSpeed,
        value: 10,
        width: getWidthFromValue(10, baseConfig.maxSpeed),
    },
};

function sliderReducer(state, action) {
    const newData = (newWidth, min, max) => ({
        value: getInterpolatedValue(newWidth, min, max),
        width: newWidth,
    });

    switch (action.type) {
        case "particles": {
            const updatedData = newData(
                action.data,
                state.particles.min,
                state.particles.max
            );
            return {
                ...state,
                particles: {
                    ...state.particles,
                    ...updatedData,
                },
            };
        }
        case "minSize": {
            const updatedData = newData(
                action.data,
                state.minSize.min,
                state.minSize.max
            );
            return {
                ...state,
                minSize: {
                    ...state.minSize,
                    ...updatedData,
                },
                maxSize:
                    updatedData.value > state.maxSize.value
                        ? { ...state.maxSize, ...updatedData }
                        : state.maxSize,
            };
        }
        case "maxSize": {
            const updatedData = newData(
                action.data,
                state.maxSize.min,
                state.maxSize.max
            );
            return {
                ...state,
                maxSize: { ...state.maxSize, ...updatedData },
                minSize:
                    updatedData.value < state.minSize.value
                        ? { ...state.minSize, ...updatedData }
                        : state.minSize,
            };
        }
        case "minSpeed": {
            const updatedData = newData(
                action.data,
                state.minSpeed.min,
                state.minSpeed.max
            );
            return {
                ...state,
                minSpeed: { ...state.minSpeed, ...updatedData },
                maxSpeed:
                    updatedData.value > state.maxSpeed.value
                        ? { ...state.maxSpeed, ...updatedData }
                        : state.maxSpeed,
            };
        }
        case "maxSpeed": {
            const updatedData = newData(
                action.data,
                state.maxSpeed.min,
                state.maxSpeed.max
            );
            return {
                ...state,
                maxSpeed: { ...state.maxSpeed, ...updatedData },
                minSpeed:
                    updatedData.value < state.minSpeed.value
                        ? { ...state.minSpeed, ...updatedData }
                        : state.minSpeed,
            };
        }
        default:
            throw new Error();
    }
}

export default function useState() {
    const [state, dispatch] = useReducer(sliderReducer, initialState);

    const types = {
        particles: "particles",
        minSize: "minSize",
        maxSize: "maxSize",
        minSpeed: "minSpeed",
        maxSpeed: "maxSpeed",
    };

    return [state, dispatch, types];
}
