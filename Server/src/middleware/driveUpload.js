import fs from "fs";
import { google } from "googleapis";
import fs from "fs";
const apikeys = JSON.parse(
	fs.readFileSync("./middleware/apikeys.json", "utf-8")
);

const SCOPE = ["https://www.googleapis.com/auth/drive"];

// A Function that can provide access to google drive api
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

// A Function that will upload the desired file to google drive folder
async function uploadFile(authClient) {
	return new Promise((resolve, rejected) => {
		const drive = google.drive({ version: "v3", auth: authClient });

		var fileMetaData = {
			name: "TestFile.txt",
			parents: ["1edJ1DbF2160nHNDrEzXuo3N7wsXzRBvW"], // A folder ID to which file will get uploaded
		};

		drive.files.create(
			{
				resource: fileMetaData,
				media: {
					body: fs.createReadStream("TestFile.txt"), // files that will get uploaded
					mimeType: "text/plain",
				},
				fields: "id",
			},
			function (error, file) {
				if (error) {
					return rejected(error);
				}
				resolve(file);
			}
		);
	});
}

authorize().then(uploadFile).catch("error", console.error()); // function call
