const trendingMain = document.getElementById("trendingMain");
const catogory = document.querySelector(".catogory");
const searchValue = document.getElementById("searchValue");
const form = document.getElementById("form");
const moviedetail = document.querySelector(".moviedetailMain");
const navbar = document.getElementById("navbar-content");

const fetchdata = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const slidingMovies = () => {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=7810631504627958844dab047babd01c`;
  let moviesData = fetchdata(url);
  moviesData.then((data) => {
    let movies = "";
    data.results.map((res) => {

      movies += `<div class='movie'>

        <div class='imgContainer' >
        <a href="#" onclick="getMovieDetails(${data.results.id
        })"> <img src='https://image.tmdb.org/t/p/w500${res.poster_path}'></a>
        </div>
        <div class="movieinfo">
        
            <h1>${res.title}</h1>
            <div class="info2">
            <span class="date"><i class="fas fa-calendar-week"></i></span> <p>${res.release_date
        } </p>
            <span><i class="fas fa-star-half-alt"></i>
            </span>
            <h6 class="ratingColor"><span class="${getClassByRate()}">${res.vote_average
        }</span></h6>
            </div>
            <p class="overview">${res.overview.substr(0, 100)}</p>
            <a class="getDetail" onclick="getMovieDetails(${res.id
        })">CheckOut</a>
        </div>
        </div>
        `;
    });
    document.querySelector(".movies-sliding").innerHTML = movies;
    console.log(data.results);
  });
};
slidingMovies();

// sliding movies ends

// getting catogories
getCatogories();
let menu;
function getCatogories() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=7810631504627958844dab047babd01c`;
  fetchdata(url).then((data) => {
    const { genres } = data;
    console.log(genres);

    // set navbar menus on top using slice methods
    var setNavbar = ""
    var selectedMenus = genres.slice(1, 5);
    console.log(selectedMenus);
    // const navbarMenus= selectedMenus.map((elem) => {
    for (let key of selectedMenus) {

      const menus = `<li><a href='#${key.id}'>${key.name}</a></li>`
      setNavbar += menus
      navbar.innerHTML = setNavbar;
    };

    // console.log(navbarMenus);
    menu = data.genres;
    setCatogory(menu);
  });
}

const setCatogory = (data) => {
  let catogoryHtml = "";
  for (const key of data) {
    let html = `
    <a href='#${key.id}' class="list">${key.name}</a>
    `;
    catogoryHtml += html;
    catogory.innerHTML = catogoryHtml;
  }
};

// catogories ends

gettrending();

function gettrending() {
  let trendingData;
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=7810631504627958844dab047babd01c`;
  fetchdata(url).then((data) => {
    trendingData = data.results;
    // console.log(trendingData);
    setTrending(trendingData);
  });
}



// upcoming movies
const setTrending = (data) => {
  let trendingHtml = "";
  // console.log(data)
  for (const key of data) {
    let card = `
        <div class="cardMain" >  
        <div class="card"">
          <a href=#  onclick="getMovieDetails(${key.id
      })"> <img src="https://image.tmdb.org/t/p/w500${key.poster_path
      }"  /></a>
            <h2>${key.original_title.substr(0, 20)}</h2>
            <div class="date-vote">    
                     
            <small><span class="date"><i class="fas fa-calendar-week"></i></span> ${key.release_date
      }</small>
            <span>
            <span class="rating"><i class="fas fa-star-half-alt"></i>
           <small class="${getClassByRate(key.vote_average)}">${key.vote_average
      }</small></span> 
           </div>
        </div>
        </div>
        `;
    trendingHtml += card;
    trendingMain.innerHTML = trendingHtml;
  }
};

// set color on rating

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// show movies on the basis of catogory

window.addEventListener("hashchange", () => {
  const id = location.hash.split("#")[1];
  console.log(id);
  const url = `https://api.themoviedb.org/3/genre/${id}/movies?api_key=7810631504627958844dab047babd01c`;
  fetchdata(url).then((res) => {
    setTrending(res.results);
  });
});

// serach movie

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchValue.value;

  console.log(inputText);
  searchMovie(inputText);
});

function searchMovie(input) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=7810631504627958844dab047babd01c&language=en-US&query=${input}&page=1&include_adult=false`;
  fetchdata(url).then((res) => {
    console.log(res);

    setTrending(res.results);
    document.querySelector("input").value=""
  });
}

// get movie detail when we click on perticular movie

let singleMovieDetail;
// getMovieDetails();
function getMovieDetails(idnum) {
  const url = `https://api.themoviedb.org/3/movie/${idnum}?api_key=7810631504627958844dab047babd01c&language=en-US`;
  fetchdata(url).then((res) => {
    console.log(res);
    singleMovieDetail = res;
    setMovieDetails(singleMovieDetail);
  });
}

function setMovieDetails(singleMovieDetail) {
  const {
    original_title,
    overview,
    poster_path,
    release_date,
    budget,
    revenue,
  } = singleMovieDetail;

  let movieHtml = "";
  let info = `
 
  <div class="moviedetailsection1">
  <div class="movieImg"><img src="https://image.tmdb.org/t/p/w500${poster_path}"/></div>
      <div class="Moviedetail">
        <h1>${original_title}</h1>
        <p>${overview}</p>
        
        <div class="details1">
        <h5> Release Date :${release_date}</h5>
        <h5> Budget: ${budget}</h5>
        <h5 >Revenue: ${revenue}</h5>
        </div>
      </div>
      </div>
      
    `;
  movieHtml += info;
  moviedetail.innerHTML = movieHtml;
}
