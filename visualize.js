var nn = test();
const wSize = 500;
var spacing = 1;
var bounds = nn.layers.length;
var gap = 0.5;

var testLoop = true;
var lastExecute = Date.now();

function setup() {
    noLoop();
    ellipseMode(CENTER);
    colorMode(HSL);
    createCanvas(wSize, wSize);
    for(let i = 0; i < nn.layers.length; i++) {
        let s = nn.layers[i];
        if(s > bounds) {
            bounds = s;
        }
    }
    spacing = Math.floor(wSize / bounds);

    setInterval(function() {
        if(testLoop) {
            let newInput = [];
            for(let i = 0; i < nn.inputSize; i++) {
                newInput.push(Math.random().map(0, 1, -1, 1));
            }
            nn.activate(newInput);
            let t = Date.now();
            console.log(Math.floor(1000 / (t - lastExecute)));
            lastExecute = t;
            draw();
        }
    }, 1000/10);
}

function draw() {
    let positions = [];
    for(let l = 0; l < nn.layers.length; l++) {
        positions.push([]);
        let len = nn.layers[l];
        let offset = Math.floor((bounds - len) / 2);
        let xCoord = l * spacing + spacing / 2;
        let circleWidth = spacing * (1-gap);
        for(let n = 0; n < len; n++) {
            let yCoord = (offset + n) * spacing + spacing / 2;
            positions[l].push({x: xCoord, y: yCoord});
            let neuron = nn.neurons[l][n];
            push();
            let color = neuron.current.outcome;
            color = color.map(-1, 1, 0, 100);
            fill(color, 100, 50);
            stroke(0);
            ellipse(xCoord, yCoord, circleWidth, circleWidth);
            pop();

            if(l > 0) {
                for(let w = 0; w < neuron.weights.length; w++) {
                    push();
                    let weight = neuron.weights[w];
                    let lineColor = weight;
                    lineColor = lineColor.map(neuron.wRange[0], neuron.wRange[1], 0, 100);
                    stroke(lineColor, 100, 50);
                    strokeWeight(Math.abs(weight));
                    let prevPosition = positions[l-1][w];
                    line(prevPosition.x, prevPosition.y, xCoord, yCoord);
                    pop();
                }
           }
        }
    }
}