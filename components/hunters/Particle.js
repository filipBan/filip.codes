const { floor } = Math;

export default class Particle {
    constructor(x, y, directionX, directionY, speed, size, color) {
        this.x = floor(x);
        this.y = floor(y);
        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.outerSize = size * 10;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.x + this.outerSize, this.y);
        ctx.arc(this.x, this.y, this.outerSize, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    update(ctx, canvas) {
        if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
            this.directionX *= -1;
        }

        if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
            this.directionY *= -1;
        }

        if (this.x + this.size > canvas.width) {
            this.x = canvas.width - this.size + 1;
        }
        if (this.x - this.size < 0) {
            this.x = this.size + 1;
        }
        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size + 1;
        }
        if (this.y - this.size < 0) {
            this.y = this.size + 1;
        }

        const angle = Math.atan2(this.directionY, this.directionX);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x + this.outerSize * Math.cos(angle),
            this.y + this.outerSize * Math.sin(angle)
        );
        ctx.stroke();
        ctx.closePath();

        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.draw(ctx);
        return false;
    }
}
