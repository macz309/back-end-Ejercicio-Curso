import express from "express";
import pkg from "./package.json";
import mongoose, { models } from "mongoose";
import router from "./api/routes/index";
import path from "path";
import fs from "fs";
import{ db_host, db_name, port} from "./api/config/config";

const app = express();
const models_path = path.join(__dirname, "./api/models");
fs.readdirSync(models_path).forEach((file)=>{
    require(models_path+"/"+file)
})

//CORS
app.use((req, res ,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();

})

app.use (express.urlencoded({extended:true}))
app.use (express.json());

app.use("/", router)

mongoose.connect(`mongodb://${db_host}:27017/${db_name}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('* Base de datos: \x1b[32m%s\x1b[0m', 'online'))

app.listen(port, () => {
    const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author}
*
* Server listening on port: ${port}
* DB: mongodb://${db_host}:27017/${db_name}
* http://${db_host}:${port}/
*
*********************************************************************************************`;
    console.debug(banner);
    console.log('* Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})
