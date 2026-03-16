const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()
const path = require('path');

// middleware
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
const uploadRoutes = require("./src/upload/upload.route")
const subscriberRoutes = require("./src/subscribers/subscriber.route")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/subscribers", subscriberRoutes)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))

app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main().then(() => console.log("Mongodb connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
