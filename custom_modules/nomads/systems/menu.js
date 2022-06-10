import {subscribe_to_input_event} from "/core/input/keyboard.js"
import {get_input_meta} from "/core/data/antlion.js";
import {get_game} from "../nomads.js"

export const init = (r) => {
    console.log("%cMenu Initialized", "color:#FBFF86")

    subscribe_to_input_event(
        get_input_meta().pause, pause_event)

    subscribe_to_input_event(
        get_input_meta().edit, edit_event)
}

export const update = () => {
}

const pause_event = (e,n) => {
    if (get_game().get_game_pause_state()) {
        console.log("⏸ game un-paused ⏸")
        closeNav()
    } else {
        console.log("⏸ game pause ⏸")
        openNav("PAUSED")
    }
}

const edit_event = (e,n) => {
    if (!get_game().get_game_pause_state()) {
        if (get_game().get_game_edit_state()) {
            console.log("game normal mode")
            closeNav()
        } else {
            console.log("game edit mode")
            openNav("EDIT")
        }
    }
}

/* Open */
function openNav(text) {
    document.getElementById("myNav").style.display = "block";
    document.getElementById("pauseText").innerHTML = text
}

/* Close */
function closeNav() {
    document.getElementById("myNav").style.display = "none";
    document.getElementById("pauseText").innerHTML = ""
}