require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./router/auth-router");
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const db = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");







app.use(errorMiddleware);
const corsOptions = {
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(process.env.PUBLIC_DIR));
app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.get("/", (req, res) => {
  res.status(200).send("you are under main route");
}); 
app.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'dist','index.html'))
})








db.connectDb().then(() => {
  app.listen(8080, () => {
    console.log("server is running");
  });
});
