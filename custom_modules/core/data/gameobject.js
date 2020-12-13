import { transform } from '/core/math/transform.js';
import {is} from '/utils/utilities.js';

export class gameobject {
    type = "gameobject";

    constructor(n, p, s, r){
        this.name = n;
        this.transform = new transform(p, s, r);
        
        this.active = true;
        this.id = 1;
        this.children = [];
        this.components = [];
        this.parent = null;

        // TODO handle scene data structure 
        // scene.add(this)
    }
    add_child(o){
        if(o === this){
            console.error("%c Cant Add Self!", 'background: #333; color: #bada55');
        } else {
            this.children.push(o);
            o.set_parent(this);
            o.transform.set_parent(this.transform);
            o.update();
        }
    }
    add_component(c){
        if(c == null){
            console.error(this.name + ": no component was given!");
        }  else {
            this.components.push(c);
            c.set_parent(this);
        }
    }
    //TODO decide on requirements!
    //add_requirements
    get_component(n){
        var components = [];

        if(!is.alpha(n)){
            console.error("\"n\" must be of type string.")
        } else {
            for(let c of this.components){
                if(c.name == n){
                    components.push(c)
                }
            }
            if (components.length == 1){
                return components[0];
            } else {
                return components;
            }
        }

        return null;
    }
    has_component(n){
        if(!is.alpha(n)){
            console.error("\"n\" must be of type string.")
        } else {
            for(let c of this.components){
                if(c.name == n){
                    return true
                }
            }
        }
        return false;
    }
    set_parent(p){
        this.parent = p;
    }
    update(delta){
        if(this.components != undefined){
            for(let c of this.components){
                c.update(delta);
            }
        }
        if(this.children != undefined){
            for(let c of this.children){
                c.update(delta);
            }
        }

        this.transform.update(delta);
    }
    information(){
        console.log(this);
        console.log(this.transform);
    }
    // to JSON ADD
}