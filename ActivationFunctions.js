var ActivationFunctions = {
    TanH : function(x) {
        return Math.tanh(x);
    },
    Softsign : function(x) {
        let d = 1 + Math.abs(x);
        return x / d;
    },
    Sinusoid : function(x) {
        return Math.sin(x);
    },
    Binary : function(x) {
        let b = (x >= 0);
        return b ? 1 : 0;
    }
};