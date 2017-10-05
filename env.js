Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

Number.prototype.limit = function(min, max) {
    let o = this;
    o = Math.max(o, min);
    o = Math.min(o, max);
    return o;
};