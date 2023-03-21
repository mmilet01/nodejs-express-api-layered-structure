import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routers - controllers/userRoutes";
import { customParamMiddleware } from "./middlewares/customParamMiddlewareTest";
import { defaultErrorMiddleware } from "./middlewares/_defaultErrorMiddleware";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(customParamMiddleware("test"));

app.use("/api", userRouter);

app.use(defaultErrorMiddleware);

app.use((req: Request, res: Response) => {
	res.status(404).json({ message: "Non existing route" });
});

export default app;
