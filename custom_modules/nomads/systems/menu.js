
import {get_input_meta} from "/core/data/antlion.js";

addEventListener("pause", function (e) {
    console.log("\t pause captured from menu")
}, false)

export const init = (r) => {
    console.log("%cMenu Initialized", "color:#FBFF86")
}

export const update = () => {
}