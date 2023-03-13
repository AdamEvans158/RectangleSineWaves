export default class Rectangle{
    constructor(x, y, width, height, amp, freq, speed){
        this.x = x;
        this.y = y;
        this.i = 0;
        this.width = width;
        this.height = height;
        this.amp = amp;
        this.freq = freq;
        this.speed = speed;
    }

    draw(ctx){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(ctx, canvasHeight){
        this.i -= this.speed;
        this.height = Math.abs(Math.sin(this.i + this.x * this.freq)) * this.amp;
        this.y = canvasHeight - 100 - this.height;
        this.draw(ctx);
    }

    update2(ctx){
        this.i -= this.speed;
        this.height = Math.abs(Math.sin(this.i + this.x * this.freq)) * this.amp;
        this.draw(ctx);
    }
}