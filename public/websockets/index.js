const form = document.getElementById('new-message')
const message = document.getElementById('input-message')
const name = document.getElementById('input-name')

form.addEventListener('submit', e => {
  e.preventDefault();

  const outgoingMessage = {
    message: message.value,
    name: name.value
  }

  socket.send(JSON.stringify(outgoingMessage));
}, false)

const socket = new WebSocket("ws://localhost:3002");

socket.onmessage = e => {

  const incomingMessage = JSON.parse(e.data);
  showMessage(incomingMessage);
};

function showMessage(data) {
  const messageElem = document.createElement('p');
  messageElem.innerHTML = `<b>${data.name}</b>: ${data.message}`
  document.getElementById('messages').appendChild(messageElem);
}