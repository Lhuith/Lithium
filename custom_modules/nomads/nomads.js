import {game} from '/core/game.js';

var NOMADS = new game("Nomads");

export const init = (data) => {
    NOMADS.init(data);
} 

export const update = (delta) => {
    NOMADS.update(delta)
} 

export const get_time = () => {
    return NOMADS.get_time();
}

export const get_game = () => {
    return NOMADS;
}

