import express from "express";
import cors from "cors";
const app = express();
import scheduleRoutes from './resources/user/routes/schedule.Routes.js';
import quotationRoutes from './resources/user/routes/quotation.Routes.js';
import morgan from "morgan"


app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to test app 💵💵💵 ");
});

app.use("/api/v1/schedule", scheduleRoutes);
app.use("/api/v1/quotation", quotationRoutes);



export default app;

