import {crypt} from "../meta/helpers/utils.js";

export class scene {
    type = this.constructor.name

    objects = new Map()
    constructor() {
        this.init()
    }
    init() {
        console.log("%cScene Initialized", "color:#C87BEC")
    }
    update(delta) {
    }
    register_object(o) {
        let id = crypt.newId()
        this.objects.set(id, o)

        // returned to registering object
        return id
    }
    get_object(id){
        return this.objects.get(id)
    }
    information() {
        console.groupCollapsed("%c\Scene Objects", "color:#C87BEC")
        console.table(Object.fromEntries([...this.objects]))
        console.groupEnd()
    }
}