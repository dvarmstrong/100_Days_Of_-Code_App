//* Create the progress model and add the user id to the progress model.

const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        progress: {
            type: String,
            required: true

        },
    },
    {timestamps: true}

        
    );