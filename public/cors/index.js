const makeRequest = (url, isComplex) => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  if (isComplex) {
    xhr.setRequestHeader('Authorization', 'Kapacuk')
  }

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


const corsSimple = document.getElementById('cors-simple')
const corsComplex = document.getElementById('cors-complex')
const noCors = document.getElementById('no-cors')


corsSimple.addEventListener('click', () => makeRequest('http://localhost:3001/cors', false))
corsComplex.addEventListener('click', () => makeRequest('http://localhost:3001/cors', true))
noCors.addEventListener('click', () => makeRequest('http://localhost:3001/no-cors', true))


