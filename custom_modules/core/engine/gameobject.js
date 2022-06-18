import { transform } from '/core/math/transform.js'
import {is} from '/core/meta/helpers/utils.js'
import { quaternion } from '/core/math/quaternion.js'
import {get_game} from "/nomads/nomads.js"

export class gameobject {
    type = this.constructor.name

    constructor(n, p, s, r){
        this.id = get_game().current_scene.register_object(this) // register itself to the scene object manifest (for now)

        if (!is.string(n)) {
            console.error(typeof n + " for name is not a string!")
        } else {
            this.name = n
        }

        if(s.length() == 0) {
            console.warn(n +" scale vector is of length 0!")
        }

        if (r == null || !is.quart(r)) {
            r = new quaternion(0,0,0,1)
            console.warn("invalid quaternion for " + n)
        }
        this.transform = new transform(p, s, r)
        this.active = true
        this.children = []
        this.components = []
    }
    add_child(o){
        if(o == this) {
            console.error("%c Cant Add Self!", 'background: #333 color: #bada55')
        } else if(this.children.includes(o)) {
            console.error(o.name + " object is already a child!")
        } else {
            this.children.push(o)
            o.set_parent_reference(this.id)
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
        if(!is.string(n)){
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
        if(!is.string(n)){
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
    set_parent_reference(i) {
        this.parent_reference_index = i
    }
    get_parent(){
        return get_game().current_scene.get_object(this.parent_reference_index)
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
    //set_id(i){
    //    this.id = i
    //}
    information(){
        console.log(this)
        console.log(this.transform)
    }
    // to JSON ADD
}