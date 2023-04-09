require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const personRouters = require('./routes/personRoutes')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
//
//
//
//
//COLOCAR .ENV NO GIT INGORE
//
//
//
//
///
//

//forma de ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use('/person', personRouters)

// rota inicial / endpoint

app.get("/", (req, res) => {
  res.json({ message: "Hi Express!" });
});
//entregar porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apirestfulcurso.iuftds3.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongoose connection successful");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
