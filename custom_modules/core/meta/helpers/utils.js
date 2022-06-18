import { Color, Vector2 } from '/build/three.module.js' 
import { get_sprite_meta } from '/core/data/antlion.js'

export const pixel = {
    map : (p) => {return (p/get_sprite_meta().SPRITE_RESOLUTION)}
}

export const col = {
    shade_RGB_color : (color, percent) => {
        let t = percent < 0 ? 0 : 255
        let p = percent < 0 ? percent * -1 : percent

        let R = color.r
        let G = color.g
        let B = color.b

        return new Color( (Math.round((t-R)*p)+R), (Math.round((t-G)*p)+G), (Math.round((t-B)*p)+B), 255)
    },
    shade_hex_color : (color, percent) => {   
        let f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF
        return "0x"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1)
    },
    shade: (color, percent) => {
        // TODO fix whatever is happening here
        if (color.length > 7 ) return shadeRGBColor(color,percent)
        else return shadeHEXColor(color,percent)
    },
    arrayHexToThreeColor : (a) => {
        let colors = []
        for(let i = 0; i < a.length; i++){
            colors.push(new Color(Number(a[i])))
        }
        return colors
    }
}
export const img = {
    get_image_data : (image) => {
        let canvas = document.createElement( 'canvas' )
        canvas.width = image.width || image.naturalWidth
        canvas.height =  image.height || image.naturalHeight
        let context = canvas.getContext( '2d' )
        context.drawImage( image, 0, 0 )
        return context.getImageData( 0, 0, image.width || image.naturalWidth, image.height || image.naturalHeight )
    }
}
export const is = {
    num     : (n) => {return typeof n === "number"},
    string   : (s) => {return typeof s === "string"},
    quart : (q) => {return typeof q == "object" && q.type != undefined && q.type == 'quaternion'},
    func    : (f) => {return typeof f === "function"},
    null    : (v) => {return v == null || v == undefined}
}
export const to = {
    rad : (d) => {return d * (Math.PI/180.0)}, 
    dag : (r) => {return r * (180.0/Math.PI)},
}
export const math = {
    EPSILON : 1e-8,
    normalize : (mn, mx, v) => {return (v - mn)/(mx-mn)},
    clamp : (mn, mx, v) => {return Math.min(Math.max(v, mn), mx)},
    in_range : (mn, mx, v) => {return v >= Math.min(mn, mx) && v <= Math.max(mn,mx)},
    frac : (f) => {return f % 1},
    random_range : (mn, mx) => {return mn + Math.random() * (mx - mn)},
    rounded_random_range : (mn, mx) => {return Math.round(math.random_range(mn,mx))},
    copy_sign : (a,b) => {return b < 0 ? -Math.abs(a) : Math.abs(a)},

    seededRandom : class {
        constructor(seed){
            if(!(Is.Num(seed))){console.error("seed must be of type number")}
            this.seed = seed % 2147483647
            if (this.seed <= 0) this.seed += 2147483646
        }
        next(){
            return this.seed * 16807 % 2147483647
        }
    },
    /*
        * Easing Functions - inspired from http://gizma.com/easing/
        * only considering the t value for the range [0, 1] => [0, 1]
        * source : https://gist.github.com/gre/1650294
    */
    easingFunctions : {
        // no easing, no acceleration
        linear:  (t) => { return t },
        // accelerating from zero velocity
        easeInQuad:  (t) => { return t * t },
        // decelerating to zero velocity
        easeOutQuad:  (t) => { return t * (2 - t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad:  (t) => { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        // accelerating from zero velocity 
        easeInCubic:  (t) => { return t * t * t },
        // decelerating to zero velocity 
        easeOutCubic:  (t) => { return (--t) * t * t + 1 },
        // acceleration until halfway, then deceleration 
        easeInOutCubic:  (t) => { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        // accelerating from zero velocity 
        easeInQuart:  (t) => { return t * t * t * t },
        // decelerating to zero velocity 
        easeOutQuart:  (t) => { return 1 - (--t) * t * t * t },
        // acceleration until halfway, then deceleration
        easeInOutQuart:  (t) => { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
        // accelerating from zero velocity
        easeInQuint:  (t) => { return t * t * t * t * t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    }
}
export const map = {
    //2 ^ 8 = 256
    mapToSS : (x, y) => {
        return new Vector2((1/8)*x, (1/8)*y)
    },
    arrayMapToSS : (a) => {
        let ss = []
        for(let i = 0; i < a.length; i++){
            ss.push(map.mapToSS(a[i].x, a[i].y))
        }
        return ss
    },
}
export const misc = {
    Swap : (a) => {return [a[1], a[0]]},
    // traversal with function call for convenance ಠ_ಠ
    Traverse : (l, ...f) => {
        if(l.Length == 0){console.error("list is empty!")}
        
        for(let o of l){
            for(let func of f){
                if(!isFunc(func)){console.error("f must be a function!")}
                func(o)
            } 
        }
    },
}



