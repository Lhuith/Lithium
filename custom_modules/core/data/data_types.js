export class resource { 
    constructor(n, t){
        this.name = n;
        this.type = t;
    }
};
export class shader_resource extends resource {
    constructor(n, t, v, f, e){
        super(n, t);
        this.vert = v;
        this.frag = f;
        this.extra = e;
    }
}
export class tile_resource extends resource{
    constructor(n, t, c, h, d){
        super(n,t);
        this.color = c;
        this.height = h;
        this.detail = d;
    }
};
export class map_resource extends resource {
    constructor(n, t, u){
        super(n, t);
        this.url = u;
    }  
};