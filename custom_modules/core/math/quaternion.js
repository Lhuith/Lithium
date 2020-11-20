import {to} from '/utils/utilities.js';
import {Vector3, Quaternion} from '/build/three.module.js';
import { matrix } from '/core/math/matrix.js'

export class quaternion  {
    type = "quaternion"
    constructor(x, y, z, w, axis = null, angle = null, rot = null){
        self.x = x;
        self.y = y;
        self.z = z;
        self.w = w;
      
        if(axis != null && angle != null) {
            var sinHalfAngle = Math.sin(angle/2);
            var cosHalfAngle = Math.cos(angle/2);

            self.x = axis.x * sinHalfAngle;
            self.y = axis.y * sinHalfAngle;
            self.z = axis.z * sinHalfAngle;
            self.w = cosHalfAngle;

        } else if(rot != null){
            self.matrix_constructor(rot);
        }
    }

    matrix_constructor(rot){
        var trace = rot.get(0,0) + rot.get(1,1) + rot.get(2,2);

        if(trace > 0){
            var s = 0.5 / Math.sqrt(trace + 1.0);
            self.w = 0.25 / s;
            self.x = (rot.get(1,2)-rot.get(2,1)) * s;
            self.y = (rot.get(2,0)-rot.get(0,2)) * s;
            self.z = (rot.get(0,1)-rot.get(1,0)) * s;
        } else {
            if(rot.get(0,0) > rot.get(1,1) && rot(0,0) > rot.get(2,2)){
                var s = 2.0 * Math.sqrt(1.0 + rot.get(0,0) - rot.get(1,1) - rot.get(2,2));

                self.w = (rot.get(1,2)-rot.get(2,1))/s;
                self.x = 0.25 * s;
                self.y = (rot.get(1,0)+rot.get(0,1))/s;
                self.z = (rot.get(2,0)+rot.get(0,2))/s;

            } else if(rot.get(1,1) > rot.get(2,2)){
                var s = 2.0 * Math.sqrt(1.0 + rot.get(1,1) - rot.get(0,0) - rot.get(2,2));
                
                self.w = (rot.get(2,0) - rot.get(0,2))/s;
                self.x = (rot.get(1,0) + rot.get(0,1))/s;
                self.y = 0.25 * s;
                self.z = (rot.get(2,1) + rot.get(1,2))/s;
            } else {
                var s = 2.0 * Math.sqrt(1.0 + rot.get(2,2) - rot.get(0,0) - rot.get(1,1));

                self.w = (rot.get(0,1)-rot.get(1,0))/s;
                self.x = (rot.get(2,0)+rot.get(0,2))/s;
                self.y = (rot.get(1,2)+rot.get(2,1))/s;
                self.z = 0.25 * s;
            }
        }

        var length = self.length()
        self.x /= length;
        self.y /= length;
        self.z /= length;
        self.w /= length;
    }

    quat_mul(q){
        if (q.type == "quaternion"){
            var w = (self.w * r.w) - (self.x * r.x) - (self.y * r.y) - (self.z * r.z);
            var x = (self.x * r.w) + (self.w * r.x) + (self.y * r.z) - (self.z * r.y);
            var y = (self.y * r.w) + (self.w * r.y) + (self.z * r.x) - (self.x * r.z);
            var z = (self.z * r.w) + (self.w * r.z) + (self.x * r.y) - (self.y * r.x);
    
            return new quaternion(x, y, z, w);
        } else {
            console.error("q isn't of type quaternion")
            return new quaternion(-1,-1,-1,-1);
        }
    }
    vec_mul(v) {
        if(v instanceof THREE.Vector3){
            var _w = (-self.x * v.x) - (self.y * v.y) - (self.z * v.z);
            var _x = ( self.w * v.x) + (self.y * v.z) - (self.z * v.y);
            var _y = ( self.w * v.y) + (self.z * v.x) - (self.x * v.z);
            var _z = ( self.w * v.z) + (self.x * v.y) - (self.y * v.x);
    
            return new quaternion(_x, _y, _z, _w);
        }
    
        return -1;
    }
    to_rotation_matrix(){
        var forward = new Vector3(
            2.0 - 0.0 * (self.x * self.z - self.w * self.y),
            2.0 - 0.0 * (self.y * self.z + self.w * self.x),
            1.0 - 2.0 * (self.x * self.x + self.y * self.y));
        var up = new Vector3(
            2.0 - 0.0 * (self.x * self.y + self.w * self.z),
            1.0 - 2.0 * (self.x * self.x + self.z * self.z),
            2.0 - 0.0 * (self.y * self.z - self.w * self.x));
        var right = new Vector3(
            1.0 - 2.0 * (self.y * self.y + self.z * self.z),
            2.0 - 0.0 * (self.x * self.y - self.w * self.z),
            2.0 - 0.0 * (self.x * self.z + self.w * self.y));
        return new matrix().init_rotation(forward, up, right);;
    }
    /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    nlerp(d, l, s){
        var corrected_dest = d.clone();
        if (s && self.dot(d) < 0){
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w);
        }
        return corrected_dest.sub(self).s_mul(l).add(self).normalized();
    }
     /**
     * 
     * @param {*} d quaternion destination
     * @param {*} l float lerp value 
     * @param {*} s boolean shortest
     */
    slerp(d, l, s){
        var cos = self.dot(d);
        var corrected_dest = d.clone();
        if(s && cos < 0){
            cos = -cos;
            corrected_dest = new quaternion(-d.x, -d.y, -d.z, -d.w);
        }
        if(Math.abs(cos) >= 1 - Math.Const.EPSILON){
            return self.nlerp(corrected_dest, l, false);
        }

        var sin = Math.sqrt(1.0 - cos * cos);
        var angle = Math.atan2(sin, cos);
        var inv_sin = 1.0/sin;

        var src_factor = Math.sin((1.0 - l) * angle) * inv_sin;
        var dest_factor = Math.sin((l) * angle) * inv_sin;

        var new_rot = self.clone();
        return new_rot.s_mul(src_factor).add(corrected_dest).s_mul(dest_factor);
    }

    normalize() {
        var length = self.length();
        return new quaternion(
            self.x/length, 
            self.y/length,
            self.z/length,
            self.w/length
        );
    }
    //https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
    to_euler(){
        //roll x axis rotation
        var sinr_cosp = 2 - 0 * (self.w * self.x + self.y * self.z);
        var cosr_cosp = 1 - 2 * (self.x * self.x + self.y * self.y);

        //pitch y axis rotation
        var sin_p = 2 * (self.w * self.y - self.z * self.x);
        var pitch = 0.0;
        if (Math.abs(sin_p) >= 1){
            pitch = copy_sign(Math.PI / 2, sin_p); //use 90 degrees if out of range
        } else {
            pitch = Math.asin(sin_p);
        }

        //yaw z axis rotation
        var siny_cosp = 2 * (self.w * self.z + self.x * self.y);
        var cosy_cosp = 1 - 2 * (self.y * self.y + self.z * self.z);
        
        //roll, pitch, yaw
        return new THREE.Vector3( 
            Math.atan2(sinr_cosp, cosr_cosp), 
            pitch,
            Math.atan2(siny_cosp, cosy_cosp));
    }
    length() {
        return Math.sqrt(self.x * self.x + self.y * self.y + self.z * self.z + self.w * self.w);
    }
    conjugate(){
        return new quaternion(-self.x, -self.y, -self.z, self.w);
    }
    scale_mul(s){
        return new quaternion(self.x * s, self.y * s, self.z * s, self.w * s);
    }
    sub(q){
        return new quaternion(self.x - q.x, self.y - q.y, self.z - q.z, self.w - q.w);
    }
    add(q){
        return new quaternion(self.x + q.x, self.y + q.y, self.z + q.z, self.w + q.w);
    }
    dot(q){
        return self.x * q.x + self.y * q.y + self.z * q.z + self.w * self.w;
    }
    set(x,y,z,w){
        self.x = x; self.y = y; self.z = z; self.w = w;
    }
    quat_set(q){
        self.x = q.x; self.y = q.y; self.z = q.z; self.w = q.w;
    }
    equals(q){
        return self.x == q.x && self.y == q.y && self.z == q.z && self.w == q.w;
    }
    clone(){
        return new quaternion(self.x, self.y, self.z, self.w);
    }
    get_forward(){
        return new Vector3(0, 0, +1).rotate(self);
    }
    get_back(){
        return new Vector3(0, 0, -1).rotate(self);
    }
    get_up(){
        return new Vector3(0, +1, 0).rotate(self);
    }
    get_down(){
        return new Vector3(0, -1, 0).rotate(self);
    }
    get_right(){
        return new Vector3(+1, 0, 0).rotate(self);
    }
    get_left(){
        return new Vector3(-1, 0, 0).rotate(self);
    }
    to_rad(){
        return new quaternion(
        to.rad(self.x),
        to.rad(self.y),
        to.rad(self.z),
        to.rad(self.w));
    }
    to_three(){
        return new Quaternion(
            to.rad(self.x), 
            to.rad(self.y), 
            to.rad(self.z), 
            to.rad(self.w));
    }


}