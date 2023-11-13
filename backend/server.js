require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const talentsRoutes = require('./routes/talents');
const indexRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/talents', talentsRoutes);
app.use('/', indexRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to db & listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })
;