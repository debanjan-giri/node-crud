import { Router } from "express";

// token check
import tokencheck from "../middleware/tokenVerification.js";

// route controller
import {
  createController,
  updateController,
  readController,
  deleteController,
} from "../controller/curdController.js";

// define route object
const routes = Router();

// Create by req.body
routes.post("/create", tokencheck, createController);

// Update by req.params.id
routes.put("/update/:id", tokencheck, updateController);

// Read by req.headers.Authorization
routes.get("/read", tokencheck, readController);

// Delete by req.query.id
routes.delete("/delete", tokencheck, deleteController);

export default routes;
