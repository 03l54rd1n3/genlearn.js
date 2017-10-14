var NeuralNetwork = function(definition, r) {

    this.inputSize = definition[0].length;
    this.wRange = r;
    this.layers = []; // Number of neurons per layer
    this.neurons = []; // 2 dimensional. Layers with all neurons
    this.current = { // Altered on activation.
        input: [],
        outcome: []
    };

    this.activate = function(input) {
        this.current.input = input.slice();
        // Activate input layer
        for(let i = 0; i < this.inputSize; i++) {
            this.neurons[0][i].activate([input[i]]);
        }

        // Activate all following layers
        for(let i = 1; i < this.layers.length; i++) {
            let iSize = this.layers[i-1]; // Input size for this layer is size of previous
            let fInput = []; // Previous layer's neuron's outcomes

            // Go through all outcomes from previous layer
            for(let j = 0; j < iSize; j++) {
                let f = this.neurons[i-1][j].current.outcome;
                fInput.push(f); // Add to input for this layer
                // this.neurons[i-1][j].clear(); // Clear neuron from other layer
            }
            for(let j = 0; j < this.neurons[i].length; j++) {
                this.neurons[i][j].activate(fInput); // Activate neurons from this layer with all inputs
            }
        }

        // Output are outcomes of all neurons from last layer
        let output = [];
        let nSize = this.neurons.length -1;
        for(let i = 0; i < this.neurons[nSize].length; i++) {
            output.push(this.neurons[nSize][i].current.outcome);
            // this.neurons[nSize][i].clear();
        }
        this.current.outcome = output.slice();
        return output;
    };

    this.clear = function() {
        this.current.input = [];
        this.current.outcome = [];
    };

    // Init
    for(let i = 0; i < definition.length; i++) {
        let len = definition[i].length;
        // Set layer definitions
        this.layers.push(len);

        let ns = [];
        // Init neurons for current layer
        let size = (i > 0) ? this.layers[i-1] : 1; // Input size length of previous layer or for first layer 1
        for(let l = 0; l < len; l++) {
            let f = definition[i][l]; //ActivationFunctions.TanH; // Only atm
            ns.push(new Neuron(size, f, this.wRange));
        }
        this.neurons.push(ns);
    }
    
};