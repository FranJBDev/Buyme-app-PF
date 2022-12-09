const server = require('./src/server');
require('dotenv').config();
const colors = require('colors');
// const showErrors = require("../api/src/messageConsole");
const { conn } = require('./src/database/db.js');
const userRoot = require('./src/controllers/userRoot/userRoot.controller');

const PORT = process.env.PORT || 8080;

// Start server
conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      userRoot(); //crear usuario adminRoot sino existe en la DB.
      console.log(
        colors.black.bgGreen(`==>> Server is running on PORT: ${PORT} `)
      );
    });
  })
  .catch((e) => console.log(e));
