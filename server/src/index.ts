import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import appRouter from "./router.js";
import createContext from "./context.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  // суффикс пути
  // получаем http://localhost:4000/trpc
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// адрес сервера: http://localhost:4000
app.listen(4000, () => {
  console.log("Server running on port 4000");
});

export type AppRouter = typeof appRouter;
