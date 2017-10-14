var Generation = function(pops, fFunction) {
    this.populations = pops;
    this.best = null;
    this.fitnessFunction = fFunction;

    this.calculateFitness = function() {
        let allNets = [];
        for(let p = 0; p < this.populations.length; p++) {
            for(let n = 0; n < this.populations[p].networks.length; n++) {
                let candidate = this.populations[p].networks[n];
                allNets.push({p: p, n: n, net: candidate.net, fitness: 0});            }
        }

        for(let i = 0; i < allNets.length; i++) {
            for(let j = i+1; j < allNets.length; j++) {
                let result = this.fitnessFunction(allNets[i].net, allNets[j].net);
                allNets[i].fitness += result[0];
                allNets[j].fitness += result[1];
            }
        }

        this.best = {net: null, fitness: NaN};
        for(let i = 0; i < allNets.length; i++) {
            let current = {net: allNets[i].net, fitness: allNets[i].fitness};
            this.populations[allNets[i].p].networks[allNets[i].n] = current;

            if(isNaN(this.best.fitness) || current.fitness > this.best.fitness) {
                this.best = current;
            }
        }
    };

    this.evolve = function() {
        let newPops = [];
        for(let p = 0; p < this.populations.length; p++) {
            newPops.push(this.populations[p].evolve());
        }
        let newGeneration = new Generation(newPops, this.fitnessFunction);
        return newGeneration;
    }
}