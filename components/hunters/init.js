import Particle from "./Particle";

export function addNewRandomParticle({ x, y, array, config }) {
    const size = Math.random() * config.maxSize.value + config.minSize.value;
    const xCoord = x
        ? x
        : Math.random() * (window.innerWidth - size * 4) + size * 2;
    const yCoord = y
        ? y
        : Math.random() * (window.innerHeight - size * 4) + size * 2;
    const directionX = Math.random() * 2 - 1;
    const directionY = Math.random() * 2 - 1;
    const speed =
        Math.random() * config.maxSpeed.value * 0.05 +
        config.minSpeed.value * 0.05;
    const colour = "#759460";

    array.push(
        new Particle(
            xCoord,
            yCoord,
            directionX,
            directionY,
            speed,
            size,
            colour
        )
    );
}

export function init(config) {
    const particleArray = [];

    for (let i = 0; i < config.particles.value; i++) {
        addNewRandomParticle({ array: particleArray, config });
    }

    return particleArray;
}
