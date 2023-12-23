const watchListEl = document.querySelector("#watch-list");
const watchList = JSON.parse(localStorage.getItem("watch-list")) || [];

function renderWatchList(watchList) {
  if (watchList?.length < 1) {
    return;
  }

  watchList.forEach((movie) => {
    const { poster, title, year } = movie;

    const li = document.createElement("li");

    const img = document.createElement("img");
    img.setAttribute("src", poster);

    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const watchListDiv = document.createElement("div");
    watchListDiv.classList.add("watchlist-container");
    const p = document.createElement("p");
    p.textContent = year;
    const btn = document.createElement("button");
    btn.setAttribute("name", "remove-from-watchlist");
    btn.innerHTML = '<i class="fa-solid fa-circle-minus"></i> Remove';
    btn.classList.add("btn-watchlist");
    btn.dataset.title = title;

    watchListDiv.append(p, btn);
    div.append(h2, watchListDiv);

    li.append(img, div);
    watchListEl.append(li);
  });
}

renderWatchList(watchList);
