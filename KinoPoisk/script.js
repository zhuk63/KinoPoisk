const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event){
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;
  const server = 'https://api.themoviedb.org/3/search/multi?api_key=943c8d932f3ea08cb6cfa467e5e47c6d&language=ru&query=' + searchText;
  requestApi(server);
}
searchForm.addEventListener('submit', apiSearch);

function requestApi(url){

  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('readystatechange', function() {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status !== 200) {
      console.log('error: ' + request.status);
      return;
    }
    
    const output = JSON.parse(request.responseText);
    let inner = '';
    output.results.forEach(function (item){
      let nameItem = item.name || item.title;
      let dateItem = item.first_air_date || item.release_date;
      inner += '<div class="col-12 col-md-4 col-x1-3">' + nameItem + '<br>' + 'дата выхода: ' + dateItem + '<br><br>' + '</div>';
      });
    movie.innerHTML = inner;
   });
  };
