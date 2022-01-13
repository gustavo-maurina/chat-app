export function sendMessage(socket, content) {
  const data = new Date();
  const currentHour =
    data.getHours().toString().length === 1
      ? `0${data.getHours()}`
      : data.getHours();
  const timeSent = `${currentHour}:${data.getMinutes()}`;

  socket.emit("send-message", { ...content, timeSent });

  return { timeSent };
}
