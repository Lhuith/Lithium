export const isNum = (n) => {return typeof n === "number"};
export const isAlpha = (s) => {return typeof s === "string"};
export const isNull = (v) => {return v == null || v == undefined};
export const Swap = (a) => {return [a[1], a[0]]};
export const Normalize = (mn, mx, v) => {return (v - mn)/(mx-mn)};
export const Clamp = (mn, mx, v) => {return Math.min(Math.max(v, mn), mx)};
export const InRange = (mn, max, v) => {return v >= Math.min(mn, mx) && v <= Math.max(mn,mx)};

export const TraverseCall = (l) => {
    if(l.Length == 0){
        console.error("list is empty!")
    }
}

//export const Distance = (mn, mx, v) => {return Math.min(Math.max(v, mn), max)};

export class SeededRandom {
    constructor(seed){
        if(!(isNum(seed))){
            console.error("seed must be of type number");
        }

        this.seed = seed % 2147483647;
        if (this.seed <= 0) this.seed += 2147483646;
    }

    next(){
        return this.seed * 16807 % 2147483647
    }
};

