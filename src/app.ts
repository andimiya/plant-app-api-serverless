// require("dotenv").config();
import express from "express";
import serverless from "serverless-http";

import routes from "./routes";

// import bodyParser from "body-parser";
// const cors = require("cors");
// const { auth } = require("express-oauth2-jwt-bearer");
// const NextAuth = require("next-auth").default;

// create the server and setup routes
const app = express();
// const cookieParser = require("cookie-parser");
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.json());
// app.use(bodyParser.json());

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

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

app.use("/", routes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  }
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).send();
  }
);

export const handler = serverless(app);
