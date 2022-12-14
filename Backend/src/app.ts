// import express from "express";
import express from "express"
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationController from "./6-controllers/vacation-controller";
import config from "./2-utils/config";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import sanitize from "./3-middleware/sanitize"
import expressRateLimit from "express-rate-limit"
import path from "path";

// Create server object
const server = express();

// // Securing DoS attacks
// server.use("/api/", expressRateLimit({
//     windowMs: 100, // Window time
//     max: 1, // Max request per window time
//     message: "Too many requests" // Message to alert when detecting more then max requests over window time
// }))

// Allow cors
server.use(cors());

// Read the body json object
server.use(express.json());

server.use('/static',express.static(__dirname + '/1-assets'))

// Sanitize tags from requests
server.use(sanitize)

// Auth
server.use("/", authController)

// Handle files
server.use(expressFileUpload())

// Routes requests to controllers
server.use("/", vacationController);

// Routes requests to controllers
server.use("/", authController);

// Route not found
server.use("*", routeNotFound);

// Catch all middleware
server.use(catchAll);

server.listen(process.env.PORT || 3000, () => console.log(`Listening on port: ${process.env.PORT || 3000}`));
