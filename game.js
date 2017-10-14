var generations = [];
var start = function() {
    function randomDef() {
        let size = randomRange(2, 3);
        let layout = [2];
        for(let i = 0; i < size; i++) {
            let nSize = randomRange(2, 5);
            layout.push(nSize);
        }
        layout.push(2);

        let def = [];
        for(let i = 0; i < layout.length; i++) {
            let ns = [];
            for(let j = 0; j < layout[i]; j++) {
                ns.push(ActivationFunctions.TanH);
            }
            def.push(ns);
        }
        return def;
    }

    let populations = [];
    let popOptionsList = [];
    const possibleRates = [0.01, 0.05, 0.1, 0.2, 0.3, 0.5];

    for(let i = 0; i < 8; i++) {
        let definition = randomDef();
        let wRange = [-2, 2];
        let size = randomRange(10, 20);
        let mutationRate = randomRange(0, possibleRates.length-1);
        mutationRate = possibleRates[mutationRate];
        let popOptions = {definition: definition, wRange: wRange, size: size, mutationRate: mutationRate};
        popOptionsList.push(popOptions);
        let newPop = new Population(popOptions);
        newPop.generateNets();
        populations.push(newPop);
    }

    console.log(popOptionsList);

    let gen0 = new Generation(populations, FitnessFunctions.Equal);
    gen0.calculateFitness();
    console.log("Best fitness: " + gen0.best.fitness);
    nn = gen0.best.net;
    generations.push(gen0);
}

var makeStep = function() {
    let i = generations.length;
    let newGen = generations[i-1].evolve();
    console.log("Generation " + (i+1) + " created");
    generations.push(newGen);
    generations[i].calculateFitness();
    console.log("Best fitness: " + generations[i].best.fitness);
    nn = generations[i].best.net;
    draw();
}