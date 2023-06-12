import express, { Router as ExpressRouter } from "express";
import * as trpcExpressAdpater from "@trpc/server/adapters/express";
import { router, createContext } from "./trpc";
import cors from "cors";
import path from "path";
import { todosRouter } from "./routes/todos";

const expressRouter = ExpressRouter();

const app = express();

const appRouter = router({
  todo: todosRouter,
});

app.use(cors());

app.use(
  "/trpc",
  trpcExpressAdpater.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

expressRouter.get("/", (req, res) => {
  res.render("index.html");
});
expressRouter.use("*", (req, res) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});
app.use(expressRouter);

app.use(express.static(path.join(__dirname, "../trpc-client/dist")));

/**
 * Extract the times of app routers for the client
 */
export type AppRouter = typeof appRouter;

export default app;
