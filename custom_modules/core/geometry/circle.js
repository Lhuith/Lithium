export class circle {
    type = this.constructor.name

    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.rsqrd = this.r * this.r;
    }
    contains(o){
        if(o == undefined) {
            return false
        }
        var d = Math.pow((o.pos.x - this.x), 2) + Math.pow((o.pos.z - this.y), 2);

        return d <= this.rsqrd;
    }
    intersects(range){
        var xDist = Math.abs(range.x - this.x);
        var yDist = Math.abs(range.y - this.y);
    
        //rad of the circle
        var r = this.r;
    
        var w = range.w;
        var h = range.h;
    
        var edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
    
        // no intersect
        if(xDist > (r + w) || yDist > (r + h)){
            return false;
        }
    
        //intersects within the circle
        if(xDist <= w || yDist <= h){
            return true;
        }
    
        return edges <= this.rsqrd;
    }
    display(){

    }
    hide(){
        
    }
}