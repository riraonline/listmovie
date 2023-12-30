// Fetch

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('http://www.omdbapi.com/?apikey=cc4239e7&s=' + inputKeyword.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const movies = response.Search;
      let cards = '';
      movies.forEach((m) => {
        cards += showCards(m);
      });
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;

      // Ketika tombol detail di klik
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');
      modalDetailButton.forEach((btn) => {
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=cc4239e7&i=' + imdbid)
            .then((response) => {
              return response.json();
            })
            .then((r) => {
              const movieDetail = showMovieDetail(r);
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

function showCards(a) {
  return `<div class="col-md-4 my-3">
  <div class="card">
    <img src="${a.Poster}" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">${a.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${a.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${a.imdbID}">Show Details</a>
    </div>
  </div>
</div>`;
}

function showMovieDetail(r) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${r.Poster}" class="img-fluid" />
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h4>${r.Title} ${r.Year}</h4></li>
        <li class="list-group-item"><strong>Director : </strong> ${r.Director}</li>
        <li class="list-group-item"><strong>Actors : </strong> ${r.Actors}</li>
        <li class="list-group-item"><strong>Writer : </strong> ${r.Writer}</li>
        <li class="list-group-item">
          <strong>Plot : </strong><br />
          ${r.Plot}
        </li>
      </ul>
    </div>
  </div>
</div>`;
}
