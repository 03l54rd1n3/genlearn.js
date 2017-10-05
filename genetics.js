var Population = function(popOptions) {
    this.networks = [];
    this.rate = popOptions.rate;
    this.mutationRate = popOptions.mutationRate;
    this.size = popOptions.size;
    this.wRange = popOptions.wRange;
    this.best = null;
    this.definition = popOptions.definition;
    this.popOptions = popOptions;

    this.evolve = function() {
        function crossover(n1, f1, n2, f2) {
            let newNet = new NeuralNetwork(this.definition, this.wRange);
            let probability = f1 / (f1 + f2);
            for(let l = 0; l < this.definition.length; l++) {
                for(let n = 0; n < this.definition[l].length; n++) {
                    let weightCount = (l > 0) ? this.definition[l-1].length : 1;
                    for(let w = 0; w < weightCount; w++) {
                        let weight = Math.random();
                        if(weight < probability) {
                            weight = n1.neurons[l][n].weights[w];
                        } else {
                            weight = n2.neurons[l][n].weights[w];
                        }
                        newNet.neurons[l][n].weights[w] = weight;
                    }
                }
            }
            return newNet;
        }

        let newPop = new Population(this.popOptions);
        let pickedIndexes = [];
        let currentMax = this.networks[0].fitness;
        while(pickedIndexes.length < this.networks.length / 2) {
            let index = -1;
            for(let i = 0; i < this.networks.length; i++) {
                if(pickedIndexes.indexOf(i) >= 0) continue;

                if(this.networks[i].fitness > currentMax) {
                    currentMax = this.networks[i].fitness;
                    index = i;
                }
            }
            pickedIndexes.push(index);
            newPop.networks.push(this.networks[index]);
        }

        let randoms = 0;
        while(randoms < Math.floor(this.networks.length / 10)) {
            let index = Math.floor(Math.random().map(0, 1, 0, this.networks.length));
            if(pickedIndexes.indexOf(index) < 0) {
                newPop.networks.push(this.networks[index]);
                randoms++;
            }
        }

        while(newPop.networks.length < this.networks.length) {
            let index1 = Math.floor(Math.random().map(0, 1, 0, newPop.networks.length));
            let index2 = index1;
            while(index2 == index1)
                index2 = Math.floor(Math.random().map(0, 1, 0, newPop.networks.length));

            let f1 = newPop.networks[index1].fitness;
            let f2 = newPop.networks[index2].fitness;
            index1 = newPop.networks[index1].net;
            index2 = newPop.networks[index2].net;

            let newNet;
            if(f1 >= f2) {
                newNet = crossover(index1, f1, index2, f2);
            } else {
                newNet = crossover(index2, f2, index1, f1);
            }
            newPop.networks.push({net : newNet, fitness : 0});
        }

        for(let nn = 0; nn < newPop.networks.length; nn++) {
            for(let l = 0; l < newPop.networks[nn].net.layers.length; l++) {
                for(let n = 0; n < newPop.networks[nn].net.layers[l]; n++) {
                    for(let w = 0; w < newPop.networks[nn].net.neurons[l][n].weights.length; w++) {
                        let p = Math.random();
                        if( p < this.mutationRate) {
                            p = (Math.random() < 0.5) ? -1 : 1;
                            let current = newPop.networks[nn].net.neurons[l][n].weights[w];
                            current += current * this.mutationRate * p;
                            current = current.limit(this.wRange[0], this.wRange[1]);
                            newPop.networks[nn].net.neurons[l][n].weights[w] = current;
                        }
                    }
                }
            }
        }

        return newPop;
    };

    this.generatePops = function() {

    }
}

var Generation = function(pops, fFunction) {
    this.populations = pops;
    this.best = null;
    this.fitnessFunction = fFunction;

    this.calculateFitness = function() {

    };

    this.evolve = function() {
        let newPops = [];
        for(let p = 0; p < this.populations.length; p++) {
            newPops.push(this.populations[p].evolve());
        }
        let newGeneration = new Generation(newPops);
    }
}