import { app } from "./src/app.js";
import { connectDB } from "./database/dbConnection.js";
import { port } from "./src/app.js";

//ADDING DB CONNECTION
connectDB();

//LISTENING SERVER
app.listen(port, () => {
  console.log(`App is Running Successfully on ${process.env.NODE_ENV} environment on port: ${port}`);
});
