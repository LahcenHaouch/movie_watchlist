const OMDB_API = "http://www.omdbapi.com/?apikey=3c882be6&plot=full";

const formEl = document.querySelector("form");
const movieListEl = document.querySelector("#movie-list");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.target);
  const movie = form.get("movie");

  const searchParams = new URLSearchParams();
  searchParams.append("s", movie);

  fetch(`${OMDB_API}&${searchParams.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      movieListEl.innerHTML = "";

      const { Search } = data;

      Search.forEach((element) => {
        const { Poster, Title, Year } = element;

        const li = document.createElement("li");

        const img = document.createElement("img");
        img.setAttribute("src", Poster);

        const div = document.createElement("div");

        const h2 = document.createElement("h2");
        h2.textContent = Title;

        const p = document.createElement("p");
        p.textContent = Year;

        div.append(h2, p);

        li.append(img, div);
        movieListEl.append(li);
      });
    });
});
