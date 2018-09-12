const makeRequest = (url) => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  xhr.setRequestHeader('Authorization', 'Kapacuk')

  xhr.onreadystatechange = function () {

    if (this.readyState !== 4) return;

    if (this.status !== 200 && this.status !== 304) {
      alert(`Error occured: ${this.status} ${this.statusText}`)
      return
    }

    alert(this.responseText)
  }

  xhr.send()
}

const cors = document.getElementById('cors')
const noCors = document.getElementById('no-cors')


cors.addEventListener('click', () => makeRequest('http://localhost:3001/cors'))
noCors.addEventListener('click', () => makeRequest('http://localhost:3001/no-cors'))
