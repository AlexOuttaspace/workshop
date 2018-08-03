class Uploader {
  constructor(file, onSuccess, onError, onProgress) {
    this.file = file
    this.fileId = hashCode(file.name + '-' + file.size + '-' + +file.lastModifiedDate);

    this.errors = 0;
    this.startByte = 0;

    this.xhrStatusUpload = null;
    this.xhrStatus = null;

    this.onSuccess = onSuccess;
    this.onError = onError;
    this.onProgress = onProgress;
    this.MAX_ERROR_COUNT = 5;
  }

  upload() {
    this.xhrStatus = new XMLHttpRequest();

    this.xhrStatus.onload = this.xhrStatus.onerror = () => {
      if (this.xhrStatus.status == 200) {
        this.startByte = +this.xhrStatus.responseText || 0;
        console.log("upload: startByte=" + this.startByte);
        this.send();
        return;
      }

      if (this.errorCount++ < this.MAX_ERROR_COUNT) {
        setTimeout(this.upload, 1000 * this.errorCount); // через 1 сек пробуем ещё раз
      } else {
        this.onError(this.xhrStatus.statusText);
      }
    }

    this.xhrStatus.open("GET", "/xhr/renewable/status", true);
    this.xhrStatus.setRequestHeader('X-File-Id', this.fileId);
    this.xhrStatus.send();
  }

  send() {
    this.xhrUpload = new XMLHttpRequest();
    this.xhrUpload.onload = this.xhrUpload.onerror = () => {
      console.log("upload end status:" + this.xhrUpload.status + " text:" + this.xhrUpload.statusText);

      if (this.xhrUpload.status == 200) {
        onSuccess();
        return;
      }

      if (this.errorCount++ < this.MAX_ERROR_COUNT) {
        setTimeout(this.resume, 1000 * this.errorCount);
      } else {
        onError(this.xhrUpload.statusText);
      }
    }

    this.xhrUpload.open("POST", "/xhr/renewable/upload", true);

    this.xhrUpload.setRequestHeader('X-File-Id', this.fileId);

    this.xhrUpload.upload.onprogress = e => {
      this.errorCount = 0;
      onProgress((this.startByte + e.loaded) / (this.startByte + e.total));
    }

    this.xhrUpload.send(this.file.slice(this.startByte));
  }

  pause() {
    this.xhrStatus && this.xhrStatus.abort();
    this.xhrUpload && this.xhrUpload.abort();
  }
}

const onProgress = ratio => {
  const currentPercentage = (ratio * 100).toFixed(2) + '%'
  document.getElementById('percentage').textContent = currentPercentage
  document.getElementById('loaded').style.width = currentPercentage
}

const hashCode = str => {
  if (str.length == 0) return 0;
  let hash = 0,
    i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

const onSuccess = () => {
  alert('File uploaded')
}

const onError = () => {
  alert('Error occured')
}

const handleSubmit = e => {
  e.preventDefault();
  const file = document.getElementById('file').files[0]
  const uploader = new Uploader(file, onSuccess, onError, onProgress)
  uploader.upload()

  stopButton.addEventListener('click', uploader.pause.bind(uploader))
}

const stopButton = document.getElementById('stop')
const form = document.getElementById('form')


form.addEventListener('submit', handleSubmit, false)

