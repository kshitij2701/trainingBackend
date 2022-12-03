import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

//testuser
//testUser123k

const app = express();
const PORT = 5000;

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


const MONGO_URL = 
            "mongodb+srv://testuser:testUser123k@cluster0.n7vv7y2.mongodb.net/?retryWrites=true&w=majority";

mongoose
.connect(MONGO_URL)
.then(()=> {
    console.log("Connected to the MongoDB");
    app.listen(PORT, () => { 
        console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err, "in err in connection")); 

app.get("/", (req, res) => {
     res.send("Hello World");
});




  









 



 

