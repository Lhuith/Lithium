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
        console.table("%c\tadded to scene: "+o.name, "color:#C87BEC")
        return id
    }
    get_object(id){
        return this.objects.get(id)
    }
}