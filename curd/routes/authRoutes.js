// import routes capability
import { Router } from "express";

// routes controller
import {
  registerController,
  loginController,
} from "../controller/authController.js";

// create a router object
const routes = Router();

// register routes
routes.post("/register", registerController);

// login routes
routes.post("/login", loginController);

export default routes;
