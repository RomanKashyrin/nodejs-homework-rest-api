const app = require("./app");
require("dotenv").config();
const mongoose = require.apply("mongoose");

const { PORT = 3000, DB_HOST } = process.env;

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server not running. Error: ${err.message}`);
    process.exit(1);
  }
})();
