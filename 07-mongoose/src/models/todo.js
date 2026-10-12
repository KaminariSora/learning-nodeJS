const mongoose = require("mongoose");

const todoSchemas = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "ต้องระบุชื่อ"],

        },
        done: {
            type: Boolean,
            default: false,
        }
    }
)