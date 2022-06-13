import { transform } from '/core/math/transform.js'
import {is} from '/core/meta/helpers/utils.js'
import { quaternion } from '/core/math/quaternion.js'
import { Vector3 } from '/build/three.module.js'
import {get_input_meta} from "./antlion.js";

export class gameobject {
    type = "gameobject"

    constructor(n, p = new Vector3(), s = new Vector3(1,1,1), r = new quaternion()){
        this.name = n

        if (r == null) {
            r = new quaternion(0,0,0,1)
            console.error("quaternion for game object not set")
        }
        this.transform = new transform(p, s, r)
        
        this.active = true
        this.id = 1
        this.children = []
        this.components = []
        this.parent = null

        // TODO handle scene data structure 
        // scene.add(this)
    }
    add_child(o){
        if(o == this) {
            console.error("%c Cant Add Self!", 'background: #333 color: #bada55')
        } else if(this.children.includes(o)) {
            console.error(o.name + " object is already a child!")
        } else {
            this.children.push(o)
            o.set_parent(this)
            o.transform.set_parent(this.transform)
            o.update()
        }
    }
    add_component(c){
        if(c == null){
            console.error(this.name + ": no component was given!")
        } else {
            c.set_parent(this)
            this.components.push(c)

            //! add check before adding components for requirements!
            this.set_required(c)
        }
    }
    //add_requirements
    get_component(n){
        let components = []
        if(!is.alpha(n)){
            console.error("\"n\" must be of type string.")
        } else {
            for(let c of this.components) {
                if(c.type == n){
                    components.push(c)
                }
            }
            if (components.length == 1) {
                return components[0]
            } else if (components.length != 0) {
                return components
            }
        }
        return null
    }
    // set required components/objects such as transforms
    set_required(c){
        if (c.required == "transform"){
            c.set_requirement(this.transform)
        } else if (c.required == "decomposer"){
            let decomp = this.get_component("decomposer")
            if (decomp != null) {
                c.set_requirement(decomp)
            }
        } else {
            for (let key in c.required) {
                console.log(key)
                let maybeComponent = this.get_component(key)
                if (maybeComponent != null) {
                    // key : set_requirement(defined requirement)
                    if (typeof c.required[key] == 'function') {
                        c.required[key](maybeComponent)
                    } else {
                        console.error(key+ " component set function not defined for "+ c.type)
                    }
                } else {
                    console.error(c.type + " requires component "+key)
                }
            }


            //if (c.required == "rigidbody") {
            //    let rigidbody = this.get_component("rigidbody")
            //    if (rigidbody != null) {
            //        c.set_requirement(rigidbody)
            //    }
            //}
        }
    }
    has_component(n){
        if(!is.alpha(n)){
            console.error("\"n\" must be of type string.")
        } else {
            for(let c of this.components){
                if(c.name == n) {
                    return true
                }
            }
        }
        return false
    }
    set_parent(p){
        this.parent = p
    }
    update(delta){
        if(this.components != undefined){
            for(let c of this.components){
                c.update(delta)
            }
        }
        if(this.children != undefined){
            for(let c of this.children){
                c.update(delta)
            }
        }
        this.transform.update(delta)
    }
    information(){
        console.log(this)
        console.log(this.transform)
    }
    // to JSON ADD
}