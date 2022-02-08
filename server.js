
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

const userRouter = require('./routes/BarberController');
app.use('/barbers', userRouter);

const dogClipperRouter = require('./routes/DogClipperController');
app.use('/dog-clippers', dogClipperRouter);

const priceRouter = require('./routes/PriceController');
app.use('/prices', priceRouter);


app.listen(3000);
