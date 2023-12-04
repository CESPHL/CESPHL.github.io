require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const corsOptions = {
    origin: [
        "https://cesphl-github-io-frontend.vercel.app",
        "https://cesphl-github-io-frontend.vercel.app/admin/manage-users/add-user",
        // Add other allowed origins as needed
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

const talentsRoutes = require("./routes/talents");
const indexRoutes = require("./routes/index");
const clientRoutes = require("./routes/clients");
const managerRoutes = require("./routes/managers");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(express.json());

app.use("/api/talents", talentsRoutes);
app.use("/api/clients", clientRoutes);
app.use("/", indexRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Hello, this is the root path!");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Connected to db & listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
