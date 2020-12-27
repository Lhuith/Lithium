import { to, math } from '/meta/helpers/utils.js';
import {Vector3, Quaternion} from '/build/three.module.js';
import { matrix } from '/core/math/matrix.js'

export class quaternion  {
    type = "quaternion"
    constructor(x, y, z, w, axis = null, angle = null, rot = null){
        if(axis != null && angle != null) {
            var sinHalfAngle = Math.sin(angle/2);
            var cosHalfAngle = Math.cos(angle/2);

            this.x = axis.x * sinHalfAngle;
            this.y = axis.y * sinHalfAngle;
            this.z = axis.z * sinHalfAngle;
            this.w = cosHalfAngle;

        } else if (rot != null){
            this.matrix_constructor(rot);
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }

    matrix_constructor(rot){
        var trace = rot.get(0,0) + rot.get(1,1) + rot.get(2,2);

        if(trace > 0){
            var s = 0.5 / Math.sqrt(trace + 1.0);
            this.w = 0.25 / s;
            this.x = (rot.get(1, 2) - rot.get(2, 1)) * s;
            this.y = (rot.get(2, 0) - rot.get(0, 2)) * s;
            this.z = (rot.get(0, 1) - rot.get(1, 0)) * s;
        } else {
            
            if(rot.get(0,0) > rot.get(1, 1) && rot.get(0, 0) > rot.get(2, 2)){
    
                var s = 2.0 * Math.sqrt(1.0 + rot.get(0, 0) - rot.get(1, 1) - rot.get(2, 2));

                this.w = (rot.get(1, 2) - rot.get(2, 1)) / s;
                this.x = 0.25 * s;
                this.y = (rot.get(1, 0) + rot.get(0, 1)) / s;
                this.z = (rot.get(2, 0) + rot.get(0, 2)) / s;

            } else if(rot.get(1, 1) > rot.get(2, 2)){
                
                var s = 2.0 * Math.sqrt(1.0 + rot.get(1, 1) - rot.get(0, 0) - rot.get(2,2));

                this.w = (rot.get(2, 0) - rot.get(0, 2)) / s;
                this.x = (rot.get(1, 0) + rot.get(0, 1)) / s;
                this.y = 0.25 * s;
                this.z = (rot.get(2, 1) + rot.get(1, 2)) / s;
            } else {
                
                var s = 2.0 * Math.sqrt(1.0 + rot.get(2, 2) - rot.get(0, 0) - rot.get(1, 1));

                this.w = (rot.get(0, 1) - rot.get(1, 0)) / s;
                this.x = (rot.get(2, 0) + rot.get(0, 2)) / s;
                this.y = (rot.get(1, 2) + rot.get(2, 1)) / s;
                this.z = 0.25 * s;
            }
        }

        var length = Math.sqrt(
            this.x * this.x + 
            this.y * this.y + 
            this.z * this.z + 
            this.w * this.w);

         this.x /= length;
         this.y /= length;
         this.z /= length;
         this.w /= length;
    }

    quat_mul(q){
        if (q.type == "quaternion"){
            var w = (this.w * r.w) - (this.x * r.x) - (this.y * r.y) - (this.z * r.z);
            var x = (this.x * r.w) + (this.w * r.x) + (this.y * r.z) - (this.z * r.y);
            var y = (this.y * r.w) + (this.w * r.y) + (this.z * r.x) - (this.x * r.z);
            var z = (this.z * r.w) + (this.w * r.z) + (this.x * r.y) - (this.y * r.x);
    
            return new quaternion(x, y, z, w);
        } else {
            console.error("q isn't of type quaternion")
            return new quaternion(-1,-1,-1,-1);
        }
    }
    vec_mul(v) {
        if(v instanceof Vector3){
            var _w = (-this.x * v.x) - (this.y * v.y) - (this.z * v.z);
            var _x = ( this.w * v.x) + (this.y * v.z) - (this.z * v.y);
            var _y = ( this.w * v.y) + (this.z * v.x) - (this.x * v.z);
            var _z = ( this.w * v.z) + (this.x * v.y) - (this.y * v.x);
    
            return new quaternion(_x, _y, _z, _w);
        }
    
        return -1;
    }
    to_rotation_matrix(){
        var forward = new Vector3(
            2.0 - 0.0 * (this.x * this.z - this.w * this.y),
            2.0 - 0.0 * (this.y * this.z + this.w * this.x),
            1.0 - 2.0 * (this.x * this.x + this.y * this.y));
        var up = new Vector3(
            2.0 - 0.0 * (this.x * this.y + this.w * this.z),
            1.0 - 2.0 * (this.x * this.x + this.z * this.z),
            2.0 - 0.0 * (this.y * this.z - this.w * this.x));
        var right = new Vector3(
            1.0 - 2.0 * (this.y * this.y + this.z * this.z),
            2.0 - 0.0 * (this.x * this.y - this.w * this.z),
            2.0 - 0.0 * (this.x * this.z + this.w * this.y));
        return new matrix().rotation(forward, up, right);;
    }
    /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    nlerp(d, l, s){
        var corrected_dest = d.clone();
        if (s && this.dot(d) < 0){
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w);
        }
        return corrected_dest.sub(this).s_mul(l).add(this).normalized();
    }
     /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    slerp(d, l, s){
        var cos = this.dot(d);
        var corrected_dest = d.clone();
        if(s && cos < 0){
            cos = -cos;
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w);
        }
        if(Math.abs(cos) >= 1 - Math.Const.EPSILON){
            return this.nlerp(corrected_dest, l, false);
        }

        var sin = Math.sqrt(1.0 - cos * cos);
        var angle = Math.atan2(sin, cos);
        var inv_sin = 1.0/sin;

        var src_factor = Math.sin((1.0 - l) * angle) * inv_sin;
        var dest_factor = Math.sin((l) * angle) * inv_sin;

        var new_rot = this.clone();
        return new_rot.s_mul(src_factor).add(corrected_dest).s_mul(dest_factor);
    }

    normalize() {
        var length = this.length();
        return new quaternion(
            this.x/length, 
            this.y/length,
            this.z/length,
            this.w/length
        );
    }
    //https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
    to_euler(){
        //roll x axis rotation
        var sinr_cosp = 2 - 0 * (this.w * this.x + this.y * this.z);
        var cosr_cosp = 1 - 2 * (this.x * this.x + this.y * this.y);

        //pitch y axis rotation
        var sin_p = 2 * (this.w * this.y - this.z * this.x);
        var pitch = 0.0;
        if (Math.abs(sin_p) >= 1){
            pitch = math.copySign(Math.PI / 2, sin_p); //use 90 degrees if out of range
        } else {
            pitch = Math.asin(sin_p);
        }

        //yaw z axis rotation
        var siny_cosp = 2 * (this.w * this.z + this.x * this.y);
        var cosy_cosp = 1 - 2 * (this.y * this.y + this.z * this.z);
        
        //roll, pitch, yaw
        return new Vector3( 
            Math.atan2(sinr_cosp, cosr_cosp), 
            pitch,
            Math.atan2(siny_cosp, cosy_cosp));
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    conjugate(){
        return new quaternion(-this.x, -this.y, -this.z, this.w);
    }
    scale_mul(s){
        return new quaternion(this.x * s, this.y * s, this.z * s, this.w * s);
    }
    sub(q){
        return new quaternion(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w);
    }
    add(q){
        return new quaternion(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w);
    }
    dot(q){
        return this.x * q.x + this.y * q.y + this.z * q.z + this.w * this.w;
    }
    set(x,y,z,w){
        this.x = x; this.y = y; this.z = z; this.w = w;
    }
    quat_set(q){
        this.x = q.x; this.y = q.y; this.z = q.z; this.w = q.w;
    }
    equals(q){
        return this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w;
    }
    clone(){
        return new quaternion(this.x, this.y, this.z, this.w);
    }
    get_forward(){
        return new Vector3(0, 0, +1).rotate(this);
    }
    get_back(){
        return new Vector3(0, 0, -1).rotate(this);
    }
    get_up(){
        return new Vector3(0, +1, 0).rotate(this);
    }
    get_down(){
        return new Vector3(0, -1, 0).rotate(this);
    }
    get_right(){
        return new Vector3(+1, 0, 0).rotate(this);
    }
    get_left(){
        return new Vector3(-1, 0, 0).rotate(this);
    }
    to_rad(){
        return new quaternion(
        to.rad(this.x),
        to.rad(this.y),
        to.rad(this.z),
        to.rad(this.w));
    }
    to_three(){
        return new Quaternion(
            to.rad(this.x), 
            to.rad(this.y), 
            to.rad(this.z), 
            to.rad(this.w));
    }


}