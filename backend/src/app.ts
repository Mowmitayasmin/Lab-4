import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import setupSwagger from "./config/swagger";
import corsOptions from "./config/cors";
import { useExpressServer } from "routing-controllers";
import { RoleController } from "./controller/roleController";
import { EmployeeController } from "./controller/employeeController";
// import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// setup the controllers and use the /api/v1 prefix for the routes
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [RoleController, EmployeeController],
  cors: corsOptions,
  defaultErrorHandler: false,
});

dotenv.config();

setupSwagger(app);
app.get("/", (_req, res) => {
  res.send("Got response from backend!");
});

// app.use(cors());
// app.use(express.json());

export default app;
