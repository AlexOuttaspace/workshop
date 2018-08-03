
const handleSubmit = e => {
  e.preventDefault();
  const formData = new FormData(e.target)

  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (event) {
    showProgress(event.loaded / event.total);
  }

  xhr.onload = xhr.onerror = function () {
    if (this.status == 200 || this.status === 304) {
      alert(this.responseText);
    } else {
      alert("error " + this.status);
    }
  };

  xhr.open("POST", "/xhr/upload", true);

  xhr.send(formData);
}

const showProgress = ratio => {
  const currentPercentage = (ratio * 100).toFixed(2) + '%'
  document.getElementById('percentage').textContent = currentPercentage
  document.getElementById('loaded').style.width = currentPercentage
}


const form = document.getElementById('form')

form.addEventListener('submit', handleSubmit, false)