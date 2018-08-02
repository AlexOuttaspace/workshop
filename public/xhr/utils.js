const initCounter = () => {
  const counter = document.getElementById('counter');
  let num = 0;
  setInterval(
    (() => counter.textContent = num++),
    500
  )
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