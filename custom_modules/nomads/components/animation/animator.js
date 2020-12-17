import { component} from '/nomads/components/component.js';

export class animator extends component {
    type = "animator"
    required = ["decomposer"]
    constructor(animations){
        super();
        this.animations_sequences = animations;
        this.current_sequence = this.animations_sequences[0];
        this.current_animation = this.animations_sequences[0].current_animation;
        this.current_index = 0;
    }
    get_current_animation = (name) => {
        for(var i = 0; i < this.animations_sequences.length; i++){
            if(this.animations_sequences[i].name == name){
                this.current_animation = this.animations_sequences[i];
                break;
            }
        }
        console.error("no animation of that name exists");
    }
    get_current_index = () => {
        return this.current_index;
    }
    //TODO update this!
    set_animation_sequence = (i) => {
        if(i > this.animations_sequences.length) {
            console.error(
                "exceeded animations length, max is: ", 
                this.animations_sequences.length); 
            return; 
        } else {
            if(this.animations_sequences[i].name == this.current_sequence.name){
                console.error("already set to animation: ", this.current_sequence.name); 
                return;
            }
            this.current_index = i;
            this.current_sequence = this.animations_sequences[i];
            this.current_sequence.time_stamp(game_time);
        }
    }
    update = (delta) => {
        this.current_sequence.update(delta);
        this.current_animation = this.current_sequence.current_animation;
        this.decomposer.set_animation(
            this.current_animation.start, 
            this.current_animation.length, 
            this.current_sequence.current_frame);
     }
     set_requirment = function(r){
        if(r.type == "decomposer"){
            this.decomposer = r;
            this.decomposer.update_buffer_animation(this);
        }
    }
}