//server start
//database connection

const connectDB = require("./config/database");
const app = require("../src/app");

connectDB()

app.listen(3000, () => {
  console.log("SeRvEr RuNnInG ========>");
});
