export default class Rectangle{
    constructor(x, y, width, height, amp, freq){
        this.x = x;
        this.y = y;
        this.i = this.x;
        this.width = width;
        this.height = height;
        this.color = "red";
        this.amp = amp;
        this.freq = freq;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(ctx, canvasHeight){
        this.i -= 1;
        this.height = Math.abs(Math.sin(this.i * this.freq)) * this.amp;
        this.y = canvasHeight - 100 - this.height
        this.draw(ctx);
    }
}