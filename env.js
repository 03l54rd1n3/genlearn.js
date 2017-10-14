Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

Number.prototype.limit = function(min, max) {
    let o = this;
    o = Math.max(o, min);
    o = Math.min(o, max);
    return o;
};

if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

if(!Array.prototype.sum) {
    Array.prototype.sum = function() {
        let sum = 0;
        for(let i = 0; i < this.length; i++) {
            sum += this[i];
        }
        return sum;
    }
}

// TODO: Exchange everywhere
function randomRange(min, max) {
    let r = Math.random();
    r = r.map(0, 1, min, max);
    r = Math.round(r);
    return r;
}