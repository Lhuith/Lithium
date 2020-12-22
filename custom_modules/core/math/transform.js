import { matrix } from '/core/math/matrix.js'
import { Vector3 } from '/build/three.module.js';
import { quaternion } from '/core/math/quaternion.js';
import {to} from '/meta/utils.js';

export class transform  {
    type = "transform"

    // p : position
    // s : scale
    // r : rotation (custom quaternion class)
    constructor(p, s, r){
        this.position = p;
        this.scale = s;
        this.rotation = r;

        this.old_position = new Vector3(0,0,0)
        this.old_scale = new Vector3(1,1,1)
        this.old_rotation = new quaternion(0,0,0,1)

        this.parent = null;

        this.parent_matrix = new matrix();
    }
    hasChanged(){
        if(this.parent != null && this.parent.hasChanged()){return true;}
        if(!this.position.equals(this.old_position)){ return true;}
        if(!this.rotation.equals(this.old_rotation)){return true;}
        if(!this.scale.equals(this.old_scale)){return true;}
        
        return false;
    }
    get_transformation(){
        var t = new matrix().translation(this.position.x, this.position.y, this.position.z);
        var r = new matrix().rotation((to.dag(this.rotation.x)), (to.dag(this.rotation.y)), to.dag(this.rotation.z));
        var s = new matrix().scale(this.scale.x, this.scale.y, this.scale.z);
        var p = this.get_parent_matrix();
    
        return p.mul(t.mul(r.mul(s)));
    }
    get_inverse_transformation(){
        var t = new matrix().translation(-this.position.x, -this.position.y, -this.position.z);
        
        var r = new matrix().rotation(this.rotation.x, this.rotation.y, this.rotation.z);
        r = r.transpose();
    
        var s = new matrix().scale(-this.scale.x, -this.scale.y, -this.scale.z);
        var p = this.get_parent_inverse_matrix();
       
        return s.mul(r.mul(t.mul(p)));
    }
    get_parent_matrix(){
        if(this.parent != null){
            this.parent_matrix = (this.parent.get_transformation());
        } else {
            this.parent_matrix =  new matrix();
        }
        return this.parent_matrix;
    }
    get_parent_inverse_matrix(){
        if(this.parent != null && this.parent.hasChanged()){
            this.parent_matrix = (this.parent.get_inverse_transformation());
        } else {
            this.parent_matrix =  new matrix();
        }
        return this.parent_matrix;
    }
    update(delta){
        if(this.old_position != null) {
            this.old_position.set(this.position.x, this.position.y, this.position.z);
            this.old_scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.old_rotation.set(this.rotation.x, this.rotation.y, this.rotation.z, this.rotation.w);
        } else {
            this.old_position = new Vector3(this.position.x + 1, this.position.y + 1, this.position.z + 1);
            this.old_scale = new Vector3(this.scale.x * 0.5, this.scale.y * 0.5, this.scale.z * 0.5);
            this.old_rotation = new quaternion(this.rotation.x + 1, this.rotation.y + 1, this.rotation.z + 1,  this.rotation.w + 1);
        }
    }
    rotate(ax, an){
        var q = new quaternion({axis : ax, angle : an});
        q.q_mul(this.rotation);
        q.normalized();
    
        this.rotation = q;
    }
    get_look_direction(p, up, debug = false){
        var dir = p.clone().sub(this.position).normalize();
        var m = new matrix().rotation_fu(dir, up);
        return new quaternion(0, 0, 0, 1, null, null, m, debug);
    }
    look_at(p, up){
        this.rotation = this.get_look_direction(p, up);
    }
    get_transformed_position(){
        return this.get_parent_matrix().transform(this.position);
    }
    get_transformed_scale(){
        return this.get_parent_matrix().transform(this.scale);
    }
    get_transformed_rotation(){
        var parentRotation = new quaternion(0,0,0,1);
    
        if(this.parent != null){
            parentRotation = this.parent.get_transformed_rotation();
        }
        return parentRotation.q_mul(this.rotation);
    }
    set_parent(t){
        if(t instanceof transform){
            this.parent = t;
            this.parent_matrix = t.get_transformation();
            this.update()
        } else {
            console.error("Not Transform!");
        }
    }
    set_position(p){
        this.position = p;
    }
    clone() {
        var new_transform = new transform(
            this.position.clone(),
            this.scale.clone(),
            this.rotation.clone(),
        );
        
        if(this.parent != null) new_transform.set_parent(this.parent);
    
        return new_transform;
    }
    has_rotated(){
        return this.rotation.x != 0 || this.rotation.y != 0 || this.rotation.z != 0;
    }
}