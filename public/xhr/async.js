const getDataAsync = () => {
  const content = document.getElementById('content')
  content.innerHtml = 'Loading... '

  const xhr = new XMLHttpRequest()

  xhr.open('GET', '/xhr/simpleXHR', true)

  xhr.onreadystatechange = function () {

    if (this.readyState !== 4) return;

    if (this.status !== 200) {
      content.textContent = `Error occured: ${this.status} ${this.statusText}`
      return
    }

    content.innerHTML = showPosts(JSON.parse(this.responseText))
    asyncButton.textContent = 'Reload (async)';
  }

  xhr.send()

  // initCounter()
}

const asyncButton = document.getElementById('async')

asyncButton.addEventListener('click', getDataAsync)