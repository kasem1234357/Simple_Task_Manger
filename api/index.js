const dotenv = require("dotenv");
dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception occured! Shutting down...');
  process.exit(1);
})

const app = require('./app');
const port = process.env.PORT || 8800;
const server = app.listen(port, () => {
    console.log('server has started...');
})
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection occured! Shutting down...');

  server.close(() => {
   process.exit(1);
  })
})
