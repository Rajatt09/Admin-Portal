import fs from 'fs';
import { google } from 'googleapis';
import multer from 'multer';
import apikeys from './apikeys.json' assert { type: "json" };

const SCOPE = ['https://www.googleapis.com/auth/drive'];

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "./public/docs";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload2 = multer({ storage,
limits: { fileSize: 20 * 1024 * 1024 } });

// Google Drive authorization
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

// Upload to Google Drive
async function uploadFileToDrive(filePath, fileName) {
    try {
        const authClient = await authorize();
        const drive = google.drive({ version: 'v3', auth: authClient });

        const fileMetaData = {
            name: fileName,
            parents: ['1edJ1DbF2160nHNDrEzXuo3N7wsXzRBvW'] // Your Google Drive folder ID
        };

        const media = {
            mimeType: 'application/octet-stream',
            body: fs.createReadStream(filePath)
        };

        const response = await drive.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        // Optionally delete the file from local storage after upload
        fs.unlinkSync(filePath);

        return response.data;
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        throw error;
    }
}

export { uploadFileToDrive };