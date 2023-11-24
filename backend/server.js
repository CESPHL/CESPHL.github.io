require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionalSuccessStatus:200
}

const talentsRoutes = require('./routes/talents');
const indexRoutes = require('./routes/index');
const clientRoutes = require('./routes/clients');
const managerRoutes = require('./routes/managers');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/talents', talentsRoutes);
app.use('/api/clients', clientRoutes);
app.use('/', indexRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/admin', adminRoutes);

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