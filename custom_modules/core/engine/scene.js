export class scene {
    type = "scene"
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
        let id = crypto.randomUUID()
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