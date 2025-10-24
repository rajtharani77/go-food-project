
import express from "express";
import mongodb from "./db.js";
import router from "./Routes/CreateUser.js";
import Displayrouter from "./Routes/displayData.js";
import Router from "./Routes/OrderData.js";

const app = express();
const port = 3000;
mongodb();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

    res.setHeader(
      "Access-control-allow-headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    next();
  });

app.use(express.json());
app.use('/api',router);
app.use('/api',Displayrouter);
app.use('/api',Router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  