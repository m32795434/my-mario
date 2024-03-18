import { Game } from "./Game";
import { Tools } from "../system/Tools";

export const Config = {
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
    bgSpeed: 2,
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": Game
    }, hero: {
        position: {
            x: 350,
            y: 385
        },
        jumpSpeed: 15,
        maxJumps: 2
    },
    platforms: {
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        },
        moveSpeed: -1.5
    },
};