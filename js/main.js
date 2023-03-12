import Rectangle from "./Rectangle.js";

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = canvas.getBoundingClientRect().height;

const colorInput = document.getElementById('colorInput');
const freqInput = document.getElementById('freqInput');
const ampInput = document.getElementById('ampInput');

let ctx = canvas.getContext('2d');

ctx.lineWidth = 3;

let rectangles = [];

let rectWidth = 20;
let amp = 100;
let freq = 0.01;
let color = "#04aa6d"

function addRects(){
    rectangles.length = 0;
    for(let i = 0; i < canvas.width/rectWidth; i++) {
        let x = i * rectWidth;
        let height = Math.abs(Math.sin(x * freq) * amp);
        let y = canvas.height - 100 - height;
        rectangles.push(new Rectangle(x, y, rectWidth, height, amp, freq));
    }
}
addRects();

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < rectangles.length; i++) {
        rectangles[i].update(ctx, canvas.height);
    }

    ctx.beginPath();
    ctx.moveTo(rectangles[0].x, rectangles[0].y);
    ctx.lineTo(rectangles[0].x + rectangles[0].width, rectangles[0].y);
    for(let i = 1; i < rectangles.length; i++) {
        ctx.lineTo(rectangles[i].x, rectangles[i].y);
        ctx.lineTo(rectangles[i].x + rectangles[i].width, rectangles[i].y);
    }
    ctx.stroke();

    ctx.fillRect(0, rectangles[0].y + rectangles[0].height, canvas.width, canvas.height);
}
animate();

colorInput.addEventListener("input", (e) => {

})