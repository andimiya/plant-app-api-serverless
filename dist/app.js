"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const routes_1 = __importDefault(require("./routes"));
// import bodyParser from "body-parser";
const cors = require("cors");
// const { auth } = require("express-oauth2-jwt-bearer");
const NextAuth = require("next-auth").default;
// create the server and setup routes
const app = (0, express_1.default)();
// const cookieParser = require("cookie-parser");
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express_1.default.json());
// app.use(bodyParser.json());
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   if (!req.url.startsWith(baseUrl)) {
//     return next();
//   }
//   // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
//   req.query.nextauth = req.url // start with request url
//     .slice(baseUrl.length) // make relative to baseUrl
//     .replace(/\?.*/, "") // remove query part, use only path part
//     .split("/"); // as array of strings
//   NextAuth(req, res, nextAuthOptions);
// });
// const jwtCheck = auth({
//   audience: "plant-app-api",
//   issuerBaseURL: "https://plant-app.us.auth0.com/",
//   tokenSigningAlg: "RS256",
// });
// enforce on all endpoints
// app.use(jwtCheck);
app.use("/", routes_1.default);
app.use((req, res, next) => {
    res.status(404).send();
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).send();
});
exports.handler = (0, serverless_http_1.default)(app);
