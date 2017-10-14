var Population = function(popOptions) {
    this.networks = []; // {fitness: int, net: NeuralNetwork}
    this.mutationRate = popOptions.mutationRate;
    this.size = popOptions.size;
    this.wRange = popOptions.wRange;
    // this.best = null;
    this.definition = popOptions.definition;
    this.popOptions = popOptions;

    this.evolve = function() {
        function crossover(def, r, n1, f1, n2, f2) { // Mix two nets by their fitness
            let newNet = new NeuralNetwork(def, r);
            let probability = f1 / (f1 + f2); // Relation of two fitness values
            for(let l = 0; l < def.length; l++) { // For all layers
                for(let n = 0; n < def[l].length; n++) { // For all nodes
                    // Number of inputs is 1 for first or number of neurorns from previous layer
                    let weightCount = (l > 0) ? def[l-1].length : 1; 
                    for(let w = 0; w < weightCount; w++) { // For all inputs
                        let weight = Math.random(); // Probability
                        if(weight < probability) { // Choose from first or second layer
                            weight = n1.neurons[l][n].weights[w];
                        } else {
                            weight = n2.neurons[l][n].weights[w];
                        }
                        // weight = weight.limit(r[0], r[1]); // Limit new weight to allowed range
                        newNet.neurons[l][n].weights[w] = weight; // Set new weight
                    }
                }
            }
            return newNet;
        }

        let newPop = new Population(this.popOptions);
        let pickedIndexes = []; // List of better half of nets (indexes only)
        while(pickedIndexes.length < this.networks.length / 2) { // Keep searching for the best neural nets (half the size of the pop)
            let currentMax = this.networks[0].fitness;
            let index = 0;
            for(let i = 0; i < this.networks.length; i++) {
                if(pickedIndexes.indexOf(i) >= 0) {
                    if(i == index) {
                        index++;
                        currentMax = this.networks[index].fitness;
                    }
                    continue;
                }

                if(this.networks[i].fitness > currentMax) {
                    currentMax = this.networks[i].fitness;
                    index = i;
                }
            }
            pickedIndexes.push(index);
            newPop.networks.push(this.networks[index]);
        }

        let randoms = 0;
        while(randoms < Math.floor(this.networks.length / 10)) { // Choose a tenth of the wanted size randomly
            let index = Math.floor(Math.random().map(0, 1, 0, this.networks.length));
            if(pickedIndexes.indexOf(index) < 0) {
                newPop.networks.push(this.networks[index]);
                randoms++;
            }
        }

        while(newPop.networks.length < this.networks.length) { // For all rmeaining networks left
            // Choose two networks from new pop
            let index1 = Math.floor(Math.random().map(0, 1, 0, newPop.networks.length));
            let index2 = index1;
            while(index2 == index1)
                index2 = Math.floor(Math.random().map(0, 1, 0, newPop.networks.length));

            // Get their fitness and networks
            let f1 = newPop.networks[index1].fitness;
            let f2 = newPop.networks[index2].fitness;
            index1 = newPop.networks[index1].net;
            index2 = newPop.networks[index2].net;

            let newNet;
            // let the first network be the one with the higher fitness
            if(f2 > f1) {
                let temp = f2;
                f2 = f1;
                f1 = temp;
                temp = index2;
                index2 = index1;
                index1 = temp;
            }
            newNet = crossover(this.definition, this.wRange, index1, f1, index2, f2); // Crossover two nets
            newPop.networks.push({net : newNet, fitness : 0}); // Add to new pop
        }

        // Randomize by mutationRate
        for(let nn = 0; nn < newPop.networks.length; nn++) { // For all layer new networks
            for(let l = 0; l < newPop.networks[nn].net.layers.length; l++) { // For all layers
                for(let n = 0; n < newPop.networks[nn].net.layers[l]; n++) { // For all neurons
                    for(let w = 0; w < newPop.networks[nn].net.neurons[l][n].weights.length; w++) { // For all weights
                        let p = Math.random(); // Random if change or not
                        if( p < this.mutationRate) { // Probability check
                            p = (Math.random() < 0.5) ? -1 : 1; // Random tendency
                            let current = newPop.networks[nn].net.neurons[l][n].weights[w]; // Weight value to change
                            current += current * this.mutationRate * p; // Change by mutation rate in direction of tendency
                            current = current.limit(this.wRange[0], this.wRange[1]); // Limit to allowed weight range
                            newPop.networks[nn].net.neurons[l][n].weights[w] = current; // Apply weight value
                        }
                    }
                }
            }
        }

        return newPop;
    };

    this.generateNets = function() {
        this.networks = [];
        for(let i = 0; i < this.size; i++) {
            let newNet = new NeuralNetwork(this.definition, this.wRange);
            newNet = {net: newNet, fitness: 0};
            this.networks.push(newNet);
        }
    }
}