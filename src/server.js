import configViewEngine from './config/viewEngine'
import initWebRoute from './routes/web'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
//import connection from './config/connectDB'

const app = express()


const port = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})