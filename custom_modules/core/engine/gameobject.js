import { transform } from '/core/math/transform.js'
import {is} from '/core/meta/helpers/utils.js'
import { quaternion } from '/core/math/quaternion.js'
import { Vector3 } from '/build/three.module.js'
import {get_game} from "/nomads/nomads.js"

export class gameobject {
    type = "gameobject"

    constructor(n, p = new Vector3(), s = new Vector3(1,1,1), r = new quaternion()){
        this.name = n
        // register itself to the scene object manifest (for now)
        this.id = get_game().current_scene.register_object(this)

        if (r == null) {
            r = new quaternion(0,0,0,1)
            console.error("quaternion for game object not set")
        }
        this.transform = new transform(p, s, r)
        
        this.active = true

        this.children = []
        this.components = []

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
            o.set_parent_reference(this)
            o.transform.set_parent_transform(this.transform)
            o.update()
        }
    }
    add_component(c){
        if(c == null){
            console.error(this.name + ": no component was given!")
        } else {
            c.set_parent_reference(this.id)
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
            if (n == "transform") {
                return this.transform
            }
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
    set_required(c) {
        for (let i = 0; i < c.required.length; i++) {
            let key = c.required[i]
            let maybeComponent = this.get_component(c.required[i])

            if (maybeComponent != null || maybeComponent != undefined) {
                // c.set_requirement | checking func eval
                let funcParse = "c."+"set_"+key
                if (eval(funcParse) != undefined) {
                    // running c.set_requirement(maybeComponent)
                    eval(funcParse+"(maybeComponent)")
                } else {
                    console.error(key+ " component set function not defined for "+ c.type)
                }
            } else {
                console.error(c.type + " requires component "+key)
            }
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
    set_parent_reference(i){
        this.set_parent_reference = i
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
    set_id(i){
        this.id = i
    }
    information(){
        console.log(this)
        console.log(this.transform)
    }
    // to JSON ADD
}