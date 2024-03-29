import {game} from '/core/engine/game.js'

let NOMADS = new game("Nomads")

export const init = (data, three) => {
    NOMADS.init(data, three)
} 

export const update = (delta) => {
    NOMADS.update(delta)
} 

export const get_time = () => {
    return NOMADS.get_time()
}

export const get_game = () => {
    return NOMADS
}

