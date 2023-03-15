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
ampInput.value = (canvas.height - 200) / 2 / 2; // Set base amplitude to half of the max amplitude

let ctx = canvas.getContext('2d');

// Arrays of the top and bottom rectangles
let bottomRectangles = [];
let topRectangles = [];

// Sine wave varibles 
let rectWidth = 20;
let amp = 100;
let freq = 0.01;
let speed = 0.01;
let color = "#00ffff80";

ctx.fillStyle = color;
ctx.lineWidth = 2;


// Functions to add and reset the rectangles
function addRects(){
    for(let i = 0; i < canvas.width/rectWidth; i++) {
        let x = i * rectWidth;
        let height = Math.abs(Math.sin(x * freq) * amp);
        let y = canvas.height - 100 - height;
        bottomRectangles.push(new Rectangle(x, y, rectWidth, height, amp, freq, speed));
        topRectangles.push(new Rectangle(x, 100, rectWidth, height, amp, freq, -speed));
    }
}
addRects();

function resetRects(){
    bottomRectangles.length = 0;
    topRectangles.length = 0;

    addRects();
}

// Draw Loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update loop
    for(let i = 0; i < bottomRectangles.length; i++) {
        bottomRectangles[i].updateBottom(ctx, canvas.height);
        topRectangles[i].updateTop(ctx);
    }

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

    for(let i = 0; i < bottomRectangles.length; i++){
        bottomRectangles[i].freq = freq;
        topRectangles[i].freq = freq;
    }
})

ampInput.addEventListener("input", (e) => {
    amp = e.target.value;

    for(let i = 0; i < bottomRectangles.length; i++){
        bottomRectangles[i].amp = amp;
        topRectangles[i].amp = amp;
    }

})

speedInput.addEventListener("input", (e) => {
    speed = e.target.value;

    for(let i = 0; i < bottomRectangles.length; i++){
        bottomRectangles[i].speed = speed;
        topRectangles[i].speed = -speed;
    }

})

widthInput.addEventListener("input", (e) => {
    rectWidth = e.target.value;

    resetRects();
})