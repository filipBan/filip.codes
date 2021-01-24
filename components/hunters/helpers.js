import { gsap } from "gsap";

export function checkCollisions(particleArray, ctx) {
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = 0; b < particleArray.length; b++) {
            const distance = Math.sqrt(
                Math.pow(particleArray[a]?.x - particleArray[b]?.x, 2) +
                    Math.pow(particleArray[a].y - particleArray[b].y, 2)
            );

            if (
                distance < particleArray[a].outerSize + particleArray[b].size &&
                distance > 0
            ) {
                if (particleArray[a].size > particleArray[b].size) {
                    const angle = Math.atan2(
                        particleArray[b].x - particleArray[a].x,
                        particleArray[b].y - particleArray[a].y
                    );

                    particleArray[a].directionX = Math.sin(angle);
                    particleArray[a].directionY = Math.cos(angle);

                    if (
                        distance <
                        particleArray[b].outerSize + particleArray[a].size
                    ) {
                        particleArray[b].directionX = Math.sin(angle);
                        particleArray[b].directionY = Math.cos(angle);
                    }
                } else if (particleArray[b].size > particleArray[a].size) {
                    const angle = Math.atan2(
                        particleArray[a].x - particleArray[b].x,
                        particleArray[a].y - particleArray[b].y
                    );

                    particleArray[b].directionX = Math.sin(angle);
                    particleArray[b].directionY = Math.cos(angle);

                    if (
                        distance <
                        particleArray[a].outerSize + particleArray[b].size
                    ) {
                        particleArray[a].directionX = Math.sin(angle);
                        particleArray[a].directionY = Math.cos(angle);
                    }
                }

                if (particleArray[a].size > particleArray[b].size) {
                    markAsHunting(ctx, particleArray[a], particleArray[b]);
                    markAsPrey(ctx, particleArray[b]);
                } else if (particleArray[b].size > particleArray[a].size) {
                    markAsHunting(ctx, particleArray[b], particleArray[a]);
                    markAsPrey(ctx, particleArray[a]);
                }

                if (distance < particleArray[a].size + particleArray[b].size) {
                    if (particleArray[a].size > particleArray[b].size) {
                        gsap.to(particleArray[a], {
                            size:
                                particleArray[a].size +
                                particleArray[b].size / 4,
                        });
                        gsap.to(particleArray[a], {
                            outerSize: particleArray[a].size * 10,
                        });
                        particleArray.splice(b, 1);
                    } else if (particleArray[b].size > particleArray[a].size) {
                        gsap.to(particleArray[b], {
                            size:
                                particleArray[b].size +
                                particleArray[a].size / 4,
                        });
                        gsap.to(particleArray[b], {
                            outerSize: particleArray[b].size * 10,
                        });
                        particleArray.splice(a, 1);
                    }
                }
            }
        }
    }
}

function markAsHunting(ctx, hunter, prey) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgba(255,0,0,0.02)";
    ctx.arc(hunter.x, hunter.y, hunter.outerSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.moveTo(hunter.x, hunter.y);
    ctx.lineTo(prey.x, prey.y);
    ctx.stroke();
    ctx.closePath();
}

function markAsPrey(ctx, particle) {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.fillStyle = "rgba(0,255,0,0.1)";
    ctx.arc(particle.x, particle.y, particle.outerSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

export function getInterpolatedValue(inputValue, min, max) {
    let result = (Math.floor(inputValue) * max) / 100;

    if (result < min) {
        result = min;
    } else if (result > max) {
        result = max;
    }

    return result;
}

export function getWidthFromCursorPosition(cursorPosition) {
    const maxWidth = 120;
    const minWidth = 0;

    let value;

    if (cursorPosition < minWidth) {
        value = minWidth;
    } else if (cursorPosition > maxWidth - 2) {
        value = maxWidth;
    } else {
        value = cursorPosition;
    }

    let result = (value * 100) / maxWidth;

    return result;
}

export function getWidthFromValue(inputValue, max) {
    const maxWidthPercent = 100;

    let result;
    if (inputValue < 0) {
        result = 0;
    } else {
        result = (inputValue * maxWidthPercent) / max;
    }

    return result;
}
