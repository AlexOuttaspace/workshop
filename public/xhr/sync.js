const getDataSync = () => {
  const content = document.getElementById('content')
  content.innerHtml = 'Loading...'

  const xhr = new XMLHttpRequest()

  xhr.open('GET', '/xhr/simpleXHR', false)

  xhr.send()

  if (xhr.status !== 200 && xhr.status !== 304) {
    content.textContent = `Error occured: ${this.status} ${this.statusText}`
    return
  }

  content.innerHTML = showPosts(JSON.parse(xhr.responseText))
  syncButton.textContent = 'Reload (sync)';

  // initCounter()
}


const syncButton = document.getElementById('sync')

syncButton.addEventListener('click', getDataSync)