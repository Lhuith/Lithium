import { to, math } from '/core/meta/helpers/utils.js'
import {Vector3, Quaternion} from '/build/three.module.js'
import { matrix } from '/core/math/matrix.js'

export class quaternion  {
    type = this.constructor.name
    constructor(x = 0, y = 0, z = 0, w = 1,
                axis = null, angle = null, rot = null){

        if(axis != null && angle != null) {
            let sinHalfAngle = Math.sin(angle/2)
            this.x = axis.x * sinHalfAngle
            this.y = axis.y * sinHalfAngle
            this.z = axis.z * sinHalfAngle
            this.w = Math.cos(angle/2)
        } else if (rot != null){
            this.matrix_constructor(rot)
        } else {
            this.x = x
            this.y = y
            this.z = z
            this.w = w
        }
    }

    matrix_constructor(rot){
        let trace = rot.get(0,0) + rot.get(1,1) + rot.get(2,2)

        if(trace > 0){
            let s = 0.5 / Math.sqrt(trace + 1.0)

            this.w = 0.25 / s
            this.x = (rot.get(1, 2) - rot.get(2, 1)) * s
            this.y = (rot.get(2, 0) - rot.get(0, 2)) * s
            this.z = (rot.get(0, 1) - rot.get(1, 0)) * s
        } else {
            
            if(rot.get(0,0) > rot.get(1, 1) && rot.get(0, 0) > rot.get(2, 2)){
                let s = 2.0 * Math.sqrt(1.0 + rot.get(0, 0) - rot.get(1, 1) - rot.get(2, 2))

                this.w = (rot.get(1, 2) - rot.get(2, 1)) / s
                this.x = 0.25 * s
                this.y = (rot.get(1, 0) + rot.get(0, 1)) / s
                this.z = (rot.get(2, 0) + rot.get(0, 2)) / s

            } else if(rot.get(1, 1) > rot.get(2, 2)){
                let s = 2.0 * Math.sqrt(1.0 + rot.get(1, 1) - rot.get(0, 0) - rot.get(2,2))

                this.w = (rot.get(2, 0) - rot.get(0, 2)) / s
                this.x = (rot.get(1, 0) + rot.get(0, 1)) / s
                this.y = 0.25 * s
                this.z = (rot.get(2, 1) + rot.get(1, 2)) / s
            } else {
                let s = 2.0 * Math.sqrt(1.0 + rot.get(2, 2) - rot.get(0, 0) - rot.get(1, 1))

                this.w = (rot.get(0, 1) - rot.get(1, 0)) / s
                this.x = (rot.get(2, 0) + rot.get(0, 2)) / s
                this.y = (rot.get(1, 2) + rot.get(2, 1)) / s
                this.z = 0.25 * s
            }
        }

        let length = Math.sqrt(
            this.x * this.x + 
            this.y * this.y + 
            this.z * this.z + 
            this.w * this.w)

         this.x /= length
         this.y /= length
         this.z /= length
         this.w /= length
    }

    quat_mul(q){
        if (q.type == "quaternion"){
            let w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
            let x = this.x * q.w + this.w * q.x + this.y * q.z - this.z * q.y
            let y = this.y * q.w + this.w * q.y + this.z * q.x - this.x * q.z
            let z = this.z * q.w + this.w * q.z + this.x * q.y - this.y * q.x
            return new quaternion(x, y, z, w)
        } else {
            console.error("q isn't of type quaternion")
            return new quaternion(-1,-1,-1,-1)
        }
    }
    vec_mul(v) {
        if(v instanceof Vector3){
            let w = (-this.x * v.x) - (this.y * v.y) - (this.z * v.z)
            let x = ( this.w * v.x) + (this.y * v.z) - (this.z * v.y)
            let y = ( this.w * v.y) + (this.z * v.x) - (this.x * v.z)
            let z = ( this.w * v.z) + (this.x * v.y) - (this.y * v.x)
    
            return new quaternion(x, y, z, w)
        }
        return -1
    }
    scale_mul(r){
		return new quaternion(this.x * r, this.y * r, this.z * r, this.w * r)
	}
    to_rotation_matrix(){
        let forward = new Vector3(
            2.0 * (this.x * this.z - this.w * this.y),
            2.0 * (this.y * this.z + this.w * this.x),
            1.0 - 2.0 * (this.x * this.x + this.y * this.y))
        let up = new Vector3(
            2.0 * (this.x * this.y + this.w * this.z),
            1.0 - 2.0 * (this.x * this.x + this.z * this.z),
            2.0 * (this.y * this.z - this.w * this.x))
        let right = new Vector3(
            1.0 - 2.0 * (this.y * this.y + this.z * this.z),
            2.0 * (this.x * this.y - this.w * this.z),
            2.0 * (this.x * this.z + this.w * this.y))
        return new matrix().rotation_fur(forward, up, right)
    }
    /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    nlerp(d, l, s){
        let corrected_dest = d.clone()
        if (s && this.dot(d) < 0){
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w)
        }
        return corrected_dest.sub(this).scale_mul(l).add(this).normalize()
    }
     /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    slerp(d, l, s){
        let cos = this.dot(d)
        let corrected_dest = d.clone()
        
        if(s && cos < 0){
            cos = -cos
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w)
        }
        
        if(Math.abs(cos) >= 1 - math.EPSILON) {
            return this.nlerp(corrected_dest, l, false)
        }

        let sin = Math.sqrt(1.0 - cos * cos)
        let angle = Math.atan2(sin, cos)
        let inv_sin = 1.0/sin

        let src_factor = Math.sin((1.0 - l) * angle) * inv_sin
        let dest_factor = Math.sin((l) * angle) * inv_sin

        return this.scale_mul(src_factor).add(corrected_dest).scale_mul(dest_factor).normalize()
    }

    normalize() {
        let length = this.length()

        return new quaternion(
            this.x/length, 
            this.y/length,
            this.z/length,
            this.w/length
        )
    }

    // http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
    three_axis_rot(r11, r12, r21, r31, r32){
        return new Vector3(
            to.dag(Math.asin ( r21 )),
            to.dag(Math.atan2( r11, r12)),
            to.dag(Math.atan2( r31, r32 )))
    }

    // https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
    to_euler(debug){
        if(debug) {console.log(this,  to.dag(this.x))}
       let t0 = +2.0 * (this.w * this.x + this.y * this.z)
       let t1 = +1.0 - 2.0 * (this.x * this.x + this.y * this.y)
       let roll = Math.atan2(t0, t1)

       let t2 = +2.0 * (this.w * this.y - this.z * this.x)
       if(t2 > +1.0) {t2 = +1.0}
       if(t2 < -1.0) {t2 = -1.0}
       let pitch = Math.asin(t2)

       let t3 = +2.0 * (this.w * this.z + this.x * this.y)
       let t4 = +1.0 - 2.0 * (this.y * this.y + this.z * this.z)
       let yaw = Math.atan2(t3, t4)

       //roll, pitch, yaw
       return new Vector3( 
           to.dag(roll), 
           to.dag(pitch),
           to.dag(yaw))
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    conjugate(){
        return new quaternion(-this.x, -this.y, -this.z, this.w)
    }
    scale_mul(s){
        return new quaternion(this.x * s, this.y * s, this.z * s, this.w * s)
    }
    sub(q){
        return new quaternion(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w)
    }
    add(q){
        return new quaternion(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w)
    }
    dot(q){
        return this.x * q.x + this.y * q.y + this.z * q.z + this.w * this.w
    }
    set(x,y,z,w){
        this.x = x; this.y = y; this.z = z; this.w = w
    }
    quat_set(q){
        this.x = q.x; this.y = q.y; this.z = q.z; this.w = q.w
    }
    equals(q){
        return this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w
    }
    clone(){
        return new quaternion(this.x, this.y, this.z, this.w)
    }
    rotate(vec){
        let w = this.vec_mul(vec).quat_mul(this.conjugate())
        return new Vector3(w.x, w.y, w.z)
    }
    get_forward(){
        return this.rotate(new Vector3(0, 0, +1))
    }
    get_back(){
        return this.rotate(new Vector3(0, 0, -1))
    }
    get_up(){
        return this.rotate(new Vector3(0, +1, 0))
    }
    get_down(){
        return this.rotate(new Vector3(0, -1, 0))
    }
    get_right(){
        return this.rotate(new Vector3(+1, 0, 0))
    }
    get_left(){
        return this.rotate(new Vector3(-1, 0, 0))
    }
    to_three(){
        return new Quaternion(
           this.x, 
           this.y, 
           this.z, 
           this.w)
    }
   
    eulerToQuaternion(e) {
        let cp = Math.cos(to.rad(e.y) * 0.5)
        let sp = Math.sin(to.rad(e.y) * 0.5)
        let cr = Math.cos(to.rad(e.x) * 0.5)
        let sr = Math.sin(to.rad(e.x) * 0.5)
        let cy = Math.cos(to.rad(e.z) * 0.5)
        let sy = Math.sin(to.rad(e.z) * 0.5)
        
        return new quaternion(
            sr * cp * cy - cr * sp * sy,
            cr * sp * cy + sr * cp * sy,
            cr * cp * sy - sr * sp * cy,
            cr * cp * cy + sr * sp * sy
        )
    }

}