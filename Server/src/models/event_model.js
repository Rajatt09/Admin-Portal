import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeFrom: {
        type: Date,
        default: Date.now,
        required: true
    },
    timeTo: {
        type: Date,
        default: Date.now,
        required: true
    },
    attachments: [{
        originalName: String,
        googleDriveId: String,
        mimeType: String
    }]
    
});

const Event = mongoose.model("Event", eventSchema);
export default Event;