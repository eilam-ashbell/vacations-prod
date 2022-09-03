import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationController from "./6-controllers/vacationController";
import config from "./2-utils/config";
import expressFileUpload from "express-fileupload"

// create server object
const server = express();

// allow cors
server.use(cors());

// read the body json object
server.use(express.json());

// handle files
server.use(expressFileUpload())

// routes requests to controllers
server.use("/", vacationController);

// route not found
server.use("*", routeNotFound);

// catch all middleware
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
