import {math} from '/meta/utils.js';
import {get_time} from '/nomads/nomads.js';

export class animation_sequence {
    constructor(name, animations, speed = 1, loop = true){
        this.name = name;
        this.animations = animations;
        this.current_animation = animations[0];
    
        this.end = false;
        this.animation_length = 0;
        this.loop = loop;
    
        for(var i = 0; i < animations.length; i++){
            this.animation_length += animations[i].length;
        }
    
        this.current_index = 0;
        // game_time
        this.game_time_stamp = get_time();
 
        this.frame_offset = math.randomRange(0, this.current_animation.length);
        this.current_frame = this.frame_offset;
        this.animation_speed = speed;
    }
    time_stamp = (time) => {
        this.game_time_stamp = time;
        this.current_index = 0;
        this.current_frame = 0;
    }
    update = (delta) => {
        this.current_frame += (delta * this.animation_speed);
    
        if(!this.end){
            if(this.current_index == this.animations.length-1){
                if(this.current_frame >= this.animations[this.current_index].length){
                    if(!this.loop){
                        this.end = true;
                        this.current_frame = 0;
                    } else {
                        this.reset_time();
                    }
                }
            } else {
                if(this.current_frame >= this.animations[this.current_index].length){
                    this.current_index ++;
                    this.reset_time();
                } 
            }
        }
        this.current_animation = this.animations[this.current_index];
    }
    reset_time = () => {
        this.game_time_stamp = get_time();
        this.current_frame = 0;
    }
    reset_sequence = () => {
        this.current_frame = get_time();
        this.current_index = 0;
    }
}