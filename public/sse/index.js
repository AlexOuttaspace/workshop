const startBtn = document.getElementById('start')
const stopBtn  = document.getElementById('stop')

const start = () => {
  const eventSource = new EventSource('/sse/subscribe');

  eventSource.onopen = function(e) {
    log("Opened new connection");
    stopBtn.addEventListener('click', () => stop(eventSource), false)
  };

  eventSource.onerror = function(e) {
    if (this.readyState == EventSource.CONNECTING) {
      log("Connection lost. Retrying...");
    } else {
      log("Error. State: " + this.readyState);
    }
  };

  eventSource.addEventListener('bye', function(e) {
    log("Bye: " + e.data);
  }, false);

  eventSource.onmessage = function(e) {
    console.log(e);
    log(e.data);
  };
}

const stop = (eventSource) => { // при нажатии на Стоп
  eventSource.close();
  log("Connection closed");
}

const log = msg => {
  logElem.innerHTML += msg + "<br>";
}

startBtn.addEventListener('click', start, false)