import {subscribe_to_input_event} from "/core/input/keyboard.js"
import {get_input_meta} from "/core/data/antlion.js";
import {get_game} from "../nomads.js"

export const init = (r) => {
    console.log("%cMenu Initialized", "color:#FBFF86")

    subscribe_to_input_event(
        get_input_meta().pause, pause_event)
}

export const update = () => {
}

const pause_event = (e,n) => {
    if (get_game().get_game_pause_state()) {
        console.log("⏸ game un-paused ⏸")
    } else {
        console.log("⏸ game pause ⏸")
    }
}