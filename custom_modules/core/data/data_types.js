export class raw_resource { 
    constructor(n, t, d){
        this.name = n;
        this.type = t;
        this.data = d;  
    }
};
  
export class shader_resource {
    constructor(v, f, e){
        this.vert = v;
        this.frag = f;
        this.extra = e;
    }
};
  
export class tile_resource {
    constructor(c, h, d){
        this.color = c;
        this.height = h;
        this.detail = d;
    }
  };
  
export class map_resource {
    constructor(url){
        this.url = url;
    }  
};