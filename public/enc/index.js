
const handleSubmit = e => {
  e.preventDefault();
  const data = {
    firstname: e.target.firstname.value,
    lastname: e.target.lastname.value
  }

  switch (e.target.encoding.value) {
    case 'GET/urlencoded':
      getUrlencoded(data)
      break;
    case 'POST/urlencoded':
      postUrlencoded(data)
      break;
    case 'POST/multipart':
      postMP(data)
      break;
    case 'POST/FormData':
      postMPFormData(data)
      break;
    default:
      break;
  }
}


const getUrlencoded = ({ lastname, firstname }) => {
  const queryString = `?lastname=${encodeURIComponent(lastname)}&firstname=${encodeURIComponent(firstname)}`

  const xhr = new XMLHttpRequest();

  xhr.open('GET', '/xhr/encription/urlencoded' + queryString, true)

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

const postUrlencoded = ({ lastname, firstname }) => {
  const body = `lastname=${encodeURIComponent(lastname)}&firstname=${encodeURIComponent(firstname)}`

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/xhr/encription/urlencoded', true)

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {

    if (this.readyState !== 4) return;

    if (this.status !== 200 && this.status !== 304) {
      alert(`Error occured: ${this.status} ${this.statusText}`)
      return
    }

    alert(this.responseText)
  }

  xhr.send(body)
}


const postMP = (data) => {
  const delimiter = 'Delimiter';
  const delimiterMiddle = `--${delimiter}\r\n`;
  const delimiterLast = `--${delimiter}--\r\n`;

  let body = ['\r\n'];
  for (let key in data) {
    body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
  }

  body = body.join(delimiterMiddle) + delimiterLast;

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/xhr/encription/multipart-formdata', true)

  xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + delimiter);

  xhr.onreadystatechange = function () {

    if (this.readyState !== 4) return;

    if (this.status !== 200 && this.status !== 304) {
      alert(`Error occured: ${this.status} ${this.statusText}`)
      return
    }

    alert(this.responseText)
  }

  xhr.send(body)
}


const postMPFormData = (data) => {
  const formData = new FormData(document.getElementById('form'));

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/xhr/encription/multipart-formdata', true)

  xhr.onreadystatechange = function () {

    if (this.readyState !== 4) return;

    if (this.status !== 200 && this.status !== 304) {
      alert(`Error occured: ${this.status} ${this.statusText}`)
      return
    }

    alert(this.responseText)
  }

  xhr.send(formData)
}

const form = document.getElementById('form')

form.addEventListener('submit', handleSubmit, false)