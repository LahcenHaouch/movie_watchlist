const OMDB_API = "http://www.omdbapi.com/?apikey=3c882be6";

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.target);
  const movie = form.get("movie");

  const searchParams = new URLSearchParams();
  searchParams.append("s", movie);

  fetch(`${OMDB_API}&${searchParams.toString()}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
});
