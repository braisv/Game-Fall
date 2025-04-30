import http from "http";
import app from "../src/app.js";

const server = http.createServer(app);

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT}is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log({ err });
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
