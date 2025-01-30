// create a user model with name email, phone no, pref1 , pref2, emailSend, whatsappSend,Date

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phoneNo: {
			type: String,
			required: true,
		},
		emailSend: {
			type: Boolean,
			default: false,
		},
		whatsappSend: {
			type: Boolean,
			default: false,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		emailSentAt: {
			type: Date,
			default: null,
		},
		whatsappSentAt: {
			type: Date,
			default: null,
		},
		eventName: {
			type: String,
		},
		eventDate: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export default User;
