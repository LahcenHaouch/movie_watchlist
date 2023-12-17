const OMDB_API = "http://www.omdbapi.com/?apikey=3c882be6&plot=full";

const formEl = document.querySelector("form");
const movieListEl = document.querySelector("#movie-list");

const WATCH_LIST_KEY = "watch-list";

movieListEl.addEventListener("click", (event) => {
  if (event.target.name !== "add-to-watchlist") {
    return;
  }

  const { poster, title, year } = event.target.dataset;

  const watchList = JSON.parse(localStorage.getItem(WATCH_LIST_KEY)) || [];

  if (watchList.find((element) => element.title === title)) {
    return;
  }

  watchList.push({ poster, title, year });
  localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(watchList));
});

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

        const watchListDiv = document.createElement("div");
        watchListDiv.classList.add("watchlist-container");
        const p = document.createElement("p");
        p.textContent = Year;
        const btn = document.createElement("button");
        btn.setAttribute("name", "add-to-watchlist");
        btn.innerHTML = '<i class="fa-solid fa-circle-plus"></i> Watchlist';
        btn.classList.add("btn-watchlist");
        btn.dataset.poster = Poster;
        btn.dataset.title = Title;
        btn.dataset.year = Year;

        watchListDiv.append(p, btn);
        div.append(h2, watchListDiv);

        li.append(img, div);
        movieListEl.append(li);
      });
    });
});
