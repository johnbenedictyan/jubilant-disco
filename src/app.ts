import express from "express";

import {
  authErrorHandler,
  prismaErrorHandler,
} from "./middleware/errorHandling";
import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import anyQueueItemsRouter from "./routes/api/anyQueueItems";
import profilesRouter from "./routes/api/profiles";
import queueItemsRouter from "./routes/api/queueItems";
import queuesRouter from "./routes/api/queues";
import reviewsRouter from "./routes/api/reviews";
import shopsRouter from "./routes/api/shops";
import tagsRouter from "./routes/api/tags";
import usersRouter from "./routes/api/users";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/api/users", usersRouter);

app.use("/api/profiles", profilesRouter);

app.use("/api/reviews", reviewsRouter);

app.use("/api/shops", shopsRouter);

app.use("/api/tags", tagsRouter);

app.use("/api/queues", queuesRouter);

app.use("/api/queueItems", queueItemsRouter);

app.use("/api/anyQueueItems", anyQueueItemsRouter);

app.get("/", function (_req, res) {
  return res.send("This is just the backend for RealWorld");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
