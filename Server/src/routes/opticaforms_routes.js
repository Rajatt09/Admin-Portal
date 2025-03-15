import express from "express";
import { getForms } from "../controllers/opticaforms_controller.js";
import updateForms from "../controllers/opticaforms_controller.js";

const route = express.Router();

route.post("/updatejson", updateForms);
route.get("/getforms", getForms);

export default route;
