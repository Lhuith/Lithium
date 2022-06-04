export const object_meta = {
    // 256/32 = 8 
    "SPRITE_SHEET_SIZE" : {"x":8, "y":8},
    // 32 = size of individual sprite block
    "SPRITE_RESOLUTION" : 32,
    "default" : {
        "mapping" : [{"x":1, "y":0}],
        "colors" : ["0xFF00FF"],
        "frames" : [],
        "map_key" : "debug"
    },
    "box" : {
        "mapping" : [{"x":0, "y":1}],
        "colors" : ["0xFFFFFF"],
        "frames" : [],
        "map_key" : "debug"
    },
    "crab" : {
        "mapping" : [{"x":0, "y":0}],
        "colors" : ["0xF8665E"],
        "frames" : [],
        "map_key" : "critters"
    },
    "lithy" : {
        "mapping" : [{"x":0, "y":0}],
        "frames" :  {"x":0, "y":0},
        "colors" : ["0xffffff"],
        "map_key" : "lithies"
    },
    "tree_01" : {
        "leaves" : {
            "mapping" : [{"x":3, "y":0}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x008B00"],
            "transform" : {
                "position" : {"x":0, "y":0, "z":0},
                "orient" : {"x":0, "y":0, "z":0, "w":1},
                "scale" : {"x":2, "y":2, "z":2}
            },
            "map_key" : "trees",
            "skip_occlusion" : true
        },
        "root" : {
            "mapping" : [{"x":0, "y":0}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x78664c"],
            "transform" : {
                "position" : {"x":0, "y":0, "z":0},
                "orient" : {"x":0, "y":0, "z":0, "w":1},
                "scale" : {"x":1, "y":1, "z":1}
            },
            "map_key" : "trees",
            "skip_occlusion" : true
            
        },
        "trunk" : {
            "mapping" : [{"x":1, "y":0}],
            "frames" :  {"x":1, "y":2},
            "colors" : ["0x78664c"],
            "transform" : {
                "position" : {"x":0, "y":0, "z":0},
                "orient" : {"x":0, "y":0, "z":0, "w":1},
                "scale" : {"x":1, "y":1, "z":1}
            },
            "map_key" : "trees",
            "skip_occlusion" : true
         
        },
        "branch" : {
            "mapping" : [{"x":2, "y":0}],
            "frames" :  {"x":1, "y":3},
            "colors" : ["0x78664c"],
            "transform" : {
                "position" : {"x":0, "y":0, "z":0},
                "orient" : {"x":0, "y":0, "z":0, "w":1},
                "scale" : {"x":1, "y":1, "z":1}
            },
            "map_key" : "trees",
            "skip_occlusion" : true
           
        }
    },
    "circle" : {
        "mapping" : [{"x":0, "y":0}],
        "frames" :  {"x":0, "y":0},
        "colors" : ["0xFFFFFF"],
        "transform" : {
            "position" : {"x":0, "y":0, "z":0},
            "orient" : {"x":0, "y":0, "z":0, "w":1},
            "scale" : {"x":2, "y":2, "z":2}
        },
        "map_key" : "multi_test",
        "tile_size" : {"x":2, "y":2}
    },
    "sun" : {
        "mapping" : [{"x":0, "y":1}],
        "frames" :  {"x":1, "y":1},
        "colors" : ["0xFFD27D"],
        "map_key" : "sky",
        "tile_size" : {"x":1, "y":1},
        "skip_occlusion" : true
    },
    "moon" : {
        "mapping" : [{"x":0, "y":2}],
        "frames" :  {"x":1, "y":1},
        "colors" : ["0xFFFFFF"],
        "map_key" : "sky",
        "tile_size" : {"x":1, "y":1},
        "skip_occlusion" : true
    },
    "star" : {
        "mapping" : [{"x":0, "y":0}],
        "frames" :  {"x":1, "y":1},
        "colors" : ["0xFFFFFF", "0xFFEDB4", "0xFFB8EA", "0xB9CEFB", "0xDFAEFF"],
        "map_key" : "sky",
        "tile_size" : {"x":1, "y":1},
        "skip_occlusion" : true
    },
    "gazebo" : {
        "gazebo_side" : {
            "mapping" : [{"x":0, "y":4}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0xC2B362"],
            "map_key" : "structures",
            "tile_size" : {"x":1, "y":1}
        },
        "gazebo_side_intersect" : {
            "mapping" : [{"x":1, "y":4}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0xC2B362"],
            "map_key" : "structures",
            "tile_size" : {"x":1, "y":1}
        },
        "gazebo_front" : {
            "mapping" : [{"x":2, "y":4}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0xC2B362"],
            "map_key" : "structures",
            "tile_size" : {"x":1, "y":1}
        },
        "gazebo_top" : {
            "mapping" : [{"x":3, "y":4}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0x815B40"],
            "map_key" : "structures",
            "tile_size" : {"x":1, "y":1}
        },
        "gazebo_pole" : {
            "mapping" : [{"x":4, "y":4}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0xAFD0AD"],
            "map_key" : "structures",
            "tile_size" : {"x":1, "y":1}
        },
        "gazebo_roof" : {
            "mapping" : [{"x":0, "y":5}],
            "frames" :  {"x":0, "y":0},
            "colors" : ["0x60432E"],
            "map_key" : "structures",
            "tile_size" : {"x":2, "y":2},
        }
    },
    "wheelchair" : {
        "frame" : {
            "mapping" : [{"x":2, "y":5}],
            "colors" : ["0x676371"],
            "frames" : [],
            "map_key" : "structures"
        },
        "seat" : {
            "mapping" : [{"x":3, "y":5}],
            "colors" : ["0x6F7687"],
            "frames" : [],
            "map_key" : "structures"
        },
    },
    "pole" : {
        "mapping" : [{"x":5, "y":4}],
        "colors" : ["0x9B9E97"],
        "frames" : [],
        "map_key" : "structures"
    },
    "pole_s" : {
        "mapping" : [{"x":6, "y":4}],
        "colors" : ["0x9B9E97"],
        "frames" : [],
        "map_key" : "structures"
    },
    "bench" : {
        "top_t" : {
            "mapping" : [{"x":1, "y":3}],
            "colors" : ["0xC2C65C"],
            "frames" : [],
            "map_key" : "structures"
        },
        "top_s" : {
            "mapping" : [{"x":2, "y":3}],
            "colors" : ["0xC2C65C"],
            "frames" : [],
            "map_key" : "structures"
        },
        "top_f" : {
            "mapping" : [{"x":3, "y":3}],
            "colors" : ["0xC2C65C"],
            "frames" : [],
            "map_key" : "structures"
        },
        "leg_s" : {
            "mapping" : [{"x":4, "y":3}],
            "colors" : ["0xC2C65C"],
            "frames" : [],
            "map_key" : "structures"
        },
        "leg_f" : {
            "mapping" : [{"x":5, "y":3}],
            "colors" : ["0xC2C65C"],
            "frames" : [],
            "map_key" : "structures"
        },
    }, 
    "ponyo_bush" : {
        "leaves" : {
            "mapping" : [{"x":0, "y":1}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x99E273"],
            "map_key" : "trees",
        },
    },
    "ponyo_tree" : {
        "roots" : {
            "mapping" : [{"x":0, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
        },
        "trunk_a" : {
            "mapping" : [{"x":1, "y":3}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
            "tile_size" : {"x":1, "y":2},
        },
        "trunk_b" : {
            "mapping" : [{"x":2, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
            "tile_size" : {"x":1, "y":2},
        },
        "large_branch" : {
            "mapping" : [{"x":3, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
            "tile_size" : {"x":1, "y":2},
        },
        "small_branch_a" : {
            "mapping" : [{"x":4, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
            "tile_size" : {"x":1, "y":2},
        },
        "small_branch_b" : {
            "mapping" : [{"x":5, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x729773"],
            "map_key" : "trees",
        },
        "leaves" : {
            "mapping" : [{"x":6, "y":2}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x92E270"],
            "map_key" : "trees",
        },
    },
    "ponyo_grass" : {
        "mapping" : [{"x":0, "y":5}],
        "frames" :  {"x":1, "y":1},
        "colors" : ["0x81bb43"],
        "map_key" : "trees",
    },
    "ponyo_stairs" : {
        "step" : {
            "mapping" : [{"x":0, "y":7}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x563C29"],
            "map_key" : "structures",
        },
        "step_bottom" : {
            "mapping" : [{"x":2, "y":7}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0x563C29"],
            "map_key" : "structures",
        },
        "railing" : {
            "mapping" : [{"x":1, "y":7}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0xFF5AC3"],
            "map_key" : "structures",
        },
        "railing_cap" : {
            "mapping" : [{"x":3, "y":7}],
            "frames" :  {"x":1, "y":1},
            "colors" : ["0xFF5AC3"],
            "map_key" : "structures",
        }
    },
    "point" : {
        "mapping" : [{"x":1, "y":1}],
        "frames" :  {"x":1, "y":1},
        "colors" : ["0xFFFFFF"],
        "map_key" : "debug",
    }
}
