import Rectangle from "./Rectangle.js";

// get canvas element 
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = canvas.getBoundingClientRect().height;

// Sine Wave Input Elements 
const sineInputs = document.getElementsByClassName("sine-input");

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
let color = "#00ff0080";

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

function updateWaveValues(){
    rectWidth = document.getElementById('widthInput').value;
    freq = document.getElementById("freqInput").value;
    amp = document.getElementById("ampInput").value;
    speed = document.getElementById("speedInput").value;
    color = document.getElementById("colorInput").value;

    ctx.fillStyle = color;

    resetRects();
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
for(let i = 0; i < sineInputs.length; i++){
    sineInputs[i].addEventListener("input", function(){ 
        updateWaveValues();
    })
}