var ActivationFunctions = {
    TanH : Math.tanh,
    Softsign : function(x) {
        let d = 1 + Math.abs(x);
        return x / d;
    },
    Sinusoid : Math.sin,
    Binary : function(x) {
        let b = (x >= 0);
        return b ? 1 : 0;
    }
};
