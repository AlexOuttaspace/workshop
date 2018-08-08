const getJson = () => {
  const elem = document.createElement("script");
  elem.src = 'http://localhost:3001/jsonp?callback=extractJson';
  document.head.appendChild(elem);
}

const extractJson = data => {


  document.getElementById('content').innerHTML = showPosts(data)
}

const showPosts = (posts) => {
  return posts.map(p => (
    `
        <article>
          <h1>${p.title}</h1>
          <p>${p.body}</p>
          <hr>
        </article
    `)
  )
}



const button = document.getElementById('jsonp')

button.addEventListener('click', getJson, false)