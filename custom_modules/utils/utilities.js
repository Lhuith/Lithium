export const is = {
    num     : (n) => {return typeof n === "number"},
    alpha   : (s) => {return typeof s === "string"},
    func    : (f) => {return typeof f === "function"},
    null    : (v) => {return v == null || v == undefined}
}
export const to = {
    rad : (d) => {return d * (Math.PI/180.0)}, // d *
    dag : (r) => {return r * (180.0/Math.PI)},
}
export const math = {
    Const : {
        EPSILON : 1e-8,
    },
    normalize : (mn, mx, v) => {return (v - mn)/(mx-mn)},
    clamp : (mn, mx, v) => {return Math.min(Math.max(v, mn), mx)},
    inRange : (mn, mx, v) => {return v >= Math.min(mn, mx) && v <= Math.max(mn,mx)},
    frac : (f) => {return f % 1;},
    randomRange : (mn, mx) => {return mn + Math.random() * (mx - mn)},
    roundedRandomRange : (mn, mx) => {return Math.round(RandomRange(mn,mx))},
    seededRandom : class {
        constructor(seed){
            if(!(Is.Num(seed))){console.error("seed must be of type number");}
            this.seed = seed % 2147483647;
            if (this.seed <= 0) this.seed += 2147483646;
        }
        next(){
            return this.seed * 16807 % 2147483647
        }
    },
    /*
        * Easing Functions - inspired from http://gizma.com/easing/
        * only considering the t value for the range [0, 1] => [0, 1]
        * source : https://gist.github.com/gre/1650294
    */
    EasingFunctions : {
        // no easing, no acceleration
        linear:  (t) => { return t },
        // accelerating from zero velocity
        easeInQuad:  (t) => { return t * t },
        // decelerating to zero velocity
        easeOutQuad:  (t) => { return t * (2 - t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad:  (t) => { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        // accelerating from zero velocity 
        easeInCubic:  (t) => { return t * t * t },
        // decelerating to zero velocity 
        easeOutCubic:  (t) => { return (--t) * t * t + 1 },
        // acceleration until halfway, then deceleration 
        easeInOutCubic:  (t) => { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        // accelerating from zero velocity 
        easeInQuart:  (t) => { return t * t * t * t },
        // decelerating to zero velocity 
        easeOutQuart:  (t) => { return 1 - (--t) * t * t * t },
        // acceleration until halfway, then deceleration
        easeInOutQuart:  (t) => { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
        // accelerating from zero velocity
        easeInQuint:  (t) => { return t * t * t * t * t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    }
}
export const Misc = {
    Swap : (a) => {return [a[1], a[0]]},
    // traversal with function call for convenance ಠ_ಠ
    Traverse : (l, ...f) => {
        if(l.Length == 0){console.error("list is empty!")}
        
        for(let o of l){
            for(let func of f){
                if(!isFunc(func)){console.error("f must be a function!")}
                func(o)
            } 
        }
    },
}



