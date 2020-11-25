import { circle } from '/core/geometry/circle.js';
import { rectangle } from '/core/geometry/rectangle.js';
import { Vector3 } from '/build/three.module.js'; 

export class quadtree {
    type = "quadtree";

    constructor(boundary, capacity){
        if (capacity < 1){
            console.error("capacity must be greater then 0.")
            return undefined
        }
        this.boundary = boundary;
        this.capacity = capacity;
        this.objects = [];
        this.divided = false;
    }
    subdivide(){
        var x = this.boundary.x;
        var y = this.boundary.y;
        var w = this.boundary.w / 2;
        var h = this.boundary.h / 2;

        var ne = new rectangle(x + w, y - h, w, h);
        this.northeast = new quad_tree(ne, this.capacity);
    
        var nw = new rectangle(x - w, y - h, w, h);
        this.northwest = new quad_tree(nw, this.capacity);
    
        var se = new rectangle(x + w, y + h, w, h);
        this.southeast = new quad_tree(se, this.capacity);
    
        var sw = new rectangle(x - w, y + h, w, h);
        this.southwest = new quad_tree(sw, this.capacity);
        
        this.divided = true;
    }
    insert(o){
        if(!this.boundary.contains(o)){
            return false;
        }
    
        if(this.objects.length < this.capacity){
            this.objects.push(o);
            return true;
        }
    
        if(!this.divided){
            this.subdivide();
        }
    
        return (
            this.northeast.insert(o) || 
            this.northwest.insert(o) || 
            this.southeast.insert(o) ||
            this.southwest.insert(o));
    }
    query(range, found, raycaster){
        if(found == undefined){
            found = [];
        }
    
        if(range.name == "circle" || range.name == "rectangle"){
            if(!range.intersects(this.boundary)){
                return found;
            }
    
            for(var i = 0; i < this.objects.length; i++){
                if(range.contains(this.objects[i])){
                    var range_vector = new Vector3(range.x, 0, range.y);
                    var d = range_vector.distanceToSquared(this.objects[i].transform.position);
                    found.push({o: this.objects[i], d: d});
                }
            }
        } 
    
        if(this.divided){
            this.northeast.query(range, found, raycaster);
            this.northwest.query(range, found, raycaster);
            this.southeast.query(range, found, raycaster);
            this.southwest.query(range, found, raycaster);
        }
    
        return found;
    }
    closest(o, count, maxDistance){
        //TODO : Add parameter Checks
        if(this.objects.length == 0){
            return [];
        }

        if(this.objects.length < count){
            return this.objects;
        }

        //Distance of query 
        if(typeof maxDistance === "undefined"){
            //a circle that contains the entire quadtree
            const outerreach = Math.sqrt(
                Math.pow(this.boundary.w, 2) + Math.pow(this.boundary.h, 2)
            );

            //distance of the query point from centre
            const pointdistance = Math.sqrt(
                Math.pow(o.transform.get_transformed_position().x, 2) + 
                Math.pow(o.transform.get_transformed_position().z, 2));

            //one quadtreee size away from the query point
            maxDistance = outerreach + pointdistance;
        }

        //Binary search with circle queries
        var inner = 0;
        var outer = maxDistance;
        var limit = 8; //limit to avoid infinite loops caused by ties
        var objects;

        while(limit > 0){
            const radius = (inner + outer) / 2;
            var p = object.transform.get_transformed_position();
            const range = new circle(p.x, p.z, radius);
            objects = this.query(range);

            if(objects.length === count){
                return objects;
            } else if (objects.length < count){
                inner = radius;
            } else {
                outer = radius;
                limit --;
            }
        }
        // Sort by sqred distance
        objects.sort(
            (a,b) => {
                var p = object.transform.get_transformed_position(); 
                const aDist = Math.pow(p.x - a.x, 2) + Math.pow(p.z - a.z, 2);
                const bDist = Math.pow(p.x - b.x, 2) + Math.pow(p.z - b.z, 2);
                return aDist - bDist;
            }
        );

        //slice to return correct count (breaks ties)
        return objects.slice(0, count);
    }
    forEach(fn){
        this.objects.forEach(fn);
    
        if(this.divided){
            this.northeast.forEach(fn);
            this.northwest.forEach(fn);
            this.southeast.forEach(fn);
            this.southwest.forEach(fn);
        }
    }
    merge(other, capacity){
        var left = Math.min(this.boundary.left, other.boundary.left);
        var right = math.max(this.boundary.right, other.boundary.right);
        var top = math.min(this.boundary.top, other.boundary.top);
        var bottom = math.max(this.boundary.bottom, other.boundary.bottom);
        var height = bottom - top;
        var width = right - left;
        var midx = left + width / 2;
        var midy = top + height / 2;
        var boundary = new rectangle(midx, midy, width, height);
        var result = new quad_tree(boundary, capacity);
        this.forEach(object => result.insert(object));
        other.forEach(object => result.insert(object));
    
        return result;
    }
    length(){
        var count = this.objects.length;
    
        if(this.divided){
            count += this.northwest.length;
            count += this.northeast.length;
            count += this.southwest.length;
            count += this.southeast.length;
        }
    
        return count;
    }
}