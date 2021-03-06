const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require("body-parser");

const apiRoutes = require("./routes");

dotenv.config();

(async () => {
  const app = express();
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', express.static(path.join(__dirname, 'public')));
  app.use("/api/exercise", apiRoutes);

  const port = process.env.PORT || 3000;

  app.listen(port, () =>
    console.log(
      `🚀 Server running at port ${port}`
    )
  );
})();
