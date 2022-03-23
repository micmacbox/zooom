//frontEnd
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  console.log(`connected to Server ${window.location.host}`);
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("disconnected from server ");
});

const handleSubmit = (event) => {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  const li = document.createElement("li");
  socket.send(makeMessage("new_message", input.value));
  li.innerText = `나: ${input.value}`;
  messageList.append(li);
  input.value = "";
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage({ type: "nickname", payload: input.value }));
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
