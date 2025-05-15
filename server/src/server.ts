import app from './app';
import http from 'http';
import {exit} from 'process';

const server = http.createServer(app);

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      return exit(1);
    case 'EADDRINUSE':
      console.error(`Port ${process.env.PORT}is already in use`);
      return exit(1);
    default:
      throw error;
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log({err});
  console.error(err);
  server.close(() => {
    exit(1);
  });
});
