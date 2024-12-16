import morgan from "morgan";
import TrafficModel from "../model/TrafficModel.js";

const TrafficMiddleware = (app) => {
  morgan(":method :url :status :res[content-length] - :response-time ms");
  app.use(
    morgan(async function (tokens, req, res) {
      let [method, url, status, _, __, responseTime, responseTimeMs] = [
        tokens.method(req, res), //method
        tokens.url(req, res), //url
        tokens.status(req, res), //status
        tokens.res(req, res, "content-length"), // _ (ignored,just a placeholder)
        "-", // __ (also ignored,just a placeholder)
        tokens["response-time"](req, res), //response-time
        "ms", //response-time ms
      ];

      await TrafficModel.create({
        method,
        url,
        responseTimeMs,
        status,
        responseTime,
      })
    })
  );
};

export default TrafficMiddleware;
