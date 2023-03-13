import Rectangle from "./Rectangle.js";

// get canvas element 
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = canvas.getBoundingClientRect().height;

// Custom value input elements
const colorInput = document.getElementById('colorInput');
const freqInput = document.getElementById('freqInput');
const ampInput = document.getElementById('ampInput');
const speedInput = document.getElementById('speedInput');
const widthInput = document.getElementById('widthInput');

ampInput.max = (canvas.height - 200) / 2; // Calculate max amplitude
ampInput.value = (canvas.height - 200) / 2 / 2;

let ctx = canvas.getContext('2d');

ctx.lineWidth = 2;

// Arrays of the top and bottom rectangles
let bottomRectangles = [];
let topRectangles = [];

// Sine wave varibles 
let rectWidth = 20;
let amp = 100;
let freq = 0.01;
let speed = 0.01;
let color = "#00ff0080";

ctx.fillStyle = color;

// Function to add and reset the rectangles
function addRects(){
    bottomRectangles.length = 0;
    topRectangles.length = 0;
    for(let i = 0; i < canvas.width/rectWidth; i++) {
        let x = i * rectWidth;
        let height = Math.abs(Math.sin(x * freq) * amp);
        let y = canvas.height - 100 - height;
        bottomRectangles.push(new Rectangle(x, y, rectWidth, height, amp, freq, speed));
        topRectangles.push(new Rectangle(x, 100, rectWidth, height, amp, freq, speed));
    }
}
addRects();

// Draw Loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update loop
    for(let i = 0; i < bottomRectangles.length; i++) {
        bottomRectangles[i].update(ctx, canvas.height);
        topRectangles[i].update2(ctx);
    }

    // Creates a black line that draws onto the top of the bottom wave
    ctx.beginPath();
    ctx.moveTo(bottomRectangles[0].x, bottomRectangles[0].y);
    ctx.lineTo(bottomRectangles[0].x + bottomRectangles[0].width, bottomRectangles[0].y);
    for(let i = 1; i < bottomRectangles.length; i++) {
        ctx.lineTo(bottomRectangles[i].x, bottomRectangles[i].y);
        ctx.lineTo(bottomRectangles[i].x + bottomRectangles[i].width, bottomRectangles[i].y);
    }
    ctx.stroke();

    // Creates a black line that draws onto the bottom of the top wave
    ctx.beginPath();
    ctx.moveTo(topRectangles[0].x, topRectangles[0].y + topRectangles[0].height);
    ctx.lineTo(topRectangles[0].x + topRectangles[0].width, topRectangles[0].y + topRectangles[0].height);
    for(let i = 1; i < topRectangles.length; i++){
        ctx.lineTo(topRectangles[i].x, topRectangles[i].y + topRectangles[i].height);
        ctx.lineTo(topRectangles[i].x + topRectangles[i].width, topRectangles[i].y + topRectangles[i].height);
    }
    ctx.stroke();

    // Filler space rectangles
    ctx.fillRect(0, 0, canvas.width, 100);
    ctx.fillRect(0, bottomRectangles[0].y + bottomRectangles[0].height, canvas.width, canvas.height);
}
animate();

// Event handlers for changes in the sine wave values
colorInput.addEventListener("change", (e) => {
    color = e.target.value;
    ctx.fillStyle = color;
})

freqInput.addEventListener("input", (e) => {
    freq = e.target.value;
    addRects();
})

ampInput.addEventListener("input", (e) => {
    amp = e.target.value;
    addRects();
})

speedInput.addEventListener("input", (e) => {
    speed = e.target.value;
    addRects();
})