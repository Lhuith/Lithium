import { transform } from '/core/math/transform.js';
import {is} from '/meta/helpers/utils.js';
import { quaternion } from '/core/math/quaternion.js'
import { Vector3 } from '/build/three.module.js'

export class gameobject {
    type = "gameobject";

    constructor(n, p = new Vector3(), s = new Vector3(), r = new quaternion()){
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
        } else {
            c.set_parent(this);
            this.components.push(c);

            //! add check before adding components for requirements!
            this.set_required(c);
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
                if(c.type == n){
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
    // set required components/objects such as transforms
    set_required(c){
        if (c.required == "transform"){
            c.set_requirement(this.transform)
        } else if (c.required == "decomposer"){
            var decomp = this.get_component("decomposer")
            if (decomp != null && decomp != undefined) {
                c.set_requirement(decomp)
            }
        }
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