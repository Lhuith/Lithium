export class animation{
    constructor(name, start, length){
        this.name = name;
        this.start = start;
        this.length = length;
        this.current_frame = start;
    }
    // TODO: Add to this
    update = () => {
        this.current_frame++;
    }
}