import Event from '../models/event_model.js';
import express from 'express';
import { uploadFileToDrive } from '../middleware/multer2.js';

const app = express.Router();

export const postCreateEvent = async (req, res) => {
    try {
        // Validate files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        // Destructure required fields from request body
        const { eventName, date, timeFrom, timeTo, venue, description } = req.body;

        // Validate required fields
        if (!eventName || !date || !timeFrom || !timeTo || !venue || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Parse and validate date and time fields
        const eventDate = new Date(date);
        const startTime = new Date(`${date}T${timeFrom}`);
        const endTime = new Date(`${date}T${timeTo}`);

        if (isNaN(eventDate.getTime()) || isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return res.status(400).json({ message: "Invalid date or time format." });
        }

        // Upload files to Google Drive
        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                try {
                    const driveResponse = await uploadFileToDrive(file.path, file.originalname);
                    return {
                        originalName: file.originalname,
                        googleDriveId: driveResponse.id,
                        mimeType: file.mimetype
                    };
                } catch (error) {
                    console.error(`Error uploading file ${file.originalname}:`, error);
                    throw new Error(`Failed to upload file ${file.originalname}`);
                }
            })
        );

        // Create and save the event in the database
        const newEvent = new Event({
            eventName,
            date: eventDate,
            timeFrom: startTime,
            timeTo: endTime,
            venue,
            description,
            attachments: uploadedFiles
        });

        const savedEvent = await newEvent.save();

        // Respond with success
        res.status(200).json({
            message: "Event created successfully!",
            event: savedEvent
        });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: error.message
        });
    }
};

export const getCreateEvent = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}