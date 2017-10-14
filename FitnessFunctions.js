var FitnessFunctions = {

    XOR : function(c1, c2) {
        let inputs = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ];
        let outputs = [[0], [1], [1], [0]];
        
        let c1Results = activateDifference(c1, inputs, outputs);
        let c2Results = activateDifference(c2, inputs, outputs);
        
        let tendency = 0;
        for(let i = 0; i < inputs.length; i++) {
            let t = c1Results[i] < c2Results[i];
            tendency += t ? 1 : -1;
        }

        let result;
        if(tendency > 0) {
            result = [1, -1];
        } else if(tendency == 0) {
            result = [0, 0];
        } else {
            result = [-1, 1];
        }

        return result;
    },
    Equal : function(c1, c2) {
        let inputs = [];
        for(let i = 0; i < 10; i++) {
            let input = [randomRange(-1, 1), randomRange(-1, 1)];
            inputs.push(input);
        }
        let outputs = inputs.slice();

        let c1results = activateDifference(c1, inputs, outputs);
        let c2results = activateDifference(c2, inputs, outputs);
        let sum1 = c1results.sum();
        let sum2 = c2results.sum();

        if(sum1 < sum2) {
            result = [1, -1];
        } else if(sum1 == sum2) {
            result = [0, 0];
        } else {
            result = [-1, 1];
        }

        return result;
    }
}

var activateDifference = function(net, inputs, outputs) {
    let results = [];
    for(let i = 0; i < inputs.length; i++) {
        let result = net.activate(inputs[i]);
        for(let j = 0; j < result.length; j++) {
            results.push(Math.abs(outputs[i][j] - result[j]));
        }
    }
    return results;
}