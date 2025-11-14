import net from "node:net";
const sockets = [];

const broadcast = (data) => {
  sockets.forEach((socket) => {
    socket.write(data);
  });
};

net
  .createServer((socket) => {
    sockets.push(socket);
    socket.on("data", (data) => broadcast(data));
    socket.on("error", (err) => console.log(err));
  })
  .listen(8080, () => console.log("server is online"));
