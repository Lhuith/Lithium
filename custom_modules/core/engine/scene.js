export class scene {
    type = "scene"
    objects = new Map()
    constructor() {
        this.init()
    }
    init() {
    }
    update(delta) {
    }
    register_object(o) {
        let id = crypto.randomUUID()
        this.objects.set(id, o)
        console.log(o.name + " added to scene")
        return id
    }
    get_object(id){
        return this.objects.get(id)
    }
}