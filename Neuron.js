var Neuron = function(iSize, f, r) {
    this.inputSize = iSize;
    this.weights = []; // Input weights
    this.wRange = r;
    this.current = { // Altered on activation.
        input: [],
        outcome: 0
    };
    this.func = f;

    this.activate = function(input) { // Activates this neuron, alters its current state and returns the outcome
        this.current.input = input.slice();
        let wSum = 0;
        for(let i = 0; i < this.inputSize; i++) { // For all inputs
            wSum += input[i] * this.weights[i]; // Multiply by corresponding input weight and add to sum
        }
        let o = this.func(wSum); // Use activation function
        this.current.outcome = o;
        return o;
    };

    this.clear = function() { // Clear current state
        this.current.input = [];
        this.current.outcome = 0;
    };

    for(let i = 0; i < this.inputSize; i++) {
        let w = Math.random();
        w = w.map(0, 1, this.wRange[0], this.wRange[1]);
        this.weights.push(w); // Initialize weights randomly
    }
};