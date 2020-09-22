const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const app = express();
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () =>
    console.log(
      `🚀 Server running at port ${port}`
    )
  );
})();
