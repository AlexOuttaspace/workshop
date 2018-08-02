const getDigits = () => {
  const content = document.getElementById('content')
  content.innerHTML = ''

  const xhr = new XMLHttpRequest()
  displayReadyState(content, xhr)

  xhr.open('GET', '/xhr/showState', true)
  displayReadyState(content, xhr)

  xhr.onreadystatechange = function () {
    displayReadyState(content, xhr)
  }

  xhr.send()
}


const displayReadyState = (container, { readyState, responseText }) => {
  container.innerHTML += `XHR State: ${readyState} | Symbols received: ${responseText.length} <br/>`
}

const stateButton = document.getElementById('state')

stateButton.addEventListener('click', getDigits)