const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI5MjNlY2IxMTM3MjRmZTRhN2FkZmZhNzVmMmNiYiIsInN1YiI6IjY0OTBiYTljYzJmZjNkMDBlMmUxYjAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pTB7FQCxeV6RFuCTqBAsvPx5OmbqePsgw56ykA1QOS4'
    }
};

function generateRandom(max) {
    return Math.floor(Math.random() * max);
}
async function getMovies(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const json = await response.json();
            const index = generateRandom(json.results.length);
            let movie = {
                title: json.results[index].title,
                poster: json.results[index].poster_path,
                rating: json.results[index].vote_average.toFixed(1)
            };
            createCard(movie);
        }
    }
    catch(error)
    {
        console.log("An error occurred:" + error)
    }
}

function createCard(movie) {

    //Create new child elements
    const image = document.createElement("img");
    const title = document.createElement("p");
    const rating = document.createElement("h2");

    //Get the card element
    const card = document.getElementById("movie-card");

    image.src=`https://image.tmdb.org/t/p/w300${movie.poster}`
    image.id = "poster"

    title.innerHTML = movie.title;
    title.id = "title";

    rating.innerHTML = movie.rating;
    rating.id = "rating";

    if(document.getElementById("poster") !== null) {
        card.removeChild(document.getElementById("poster"));
        card.removeChild(document.getElementById("title"));
        card.removeChild(document.getElementById("rating"));
    }

    image.style.marginLeft = "15px";
    image.style.marginRight = "15px";
    image.style.borderRadius = "10px";

    title.style.textDecoration = "underline";
    title.style.marginLeft = "5px";
    title.style.marginRight = "5px";
    title.style.marginTop = "-5px";

    if(movie.rating < 6) {
        rating.style.color = "red";
    }

    rating.style.marginTop = "10px";
    rating.style.marginBottom = "0px";

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(rating);
}

document.getElementById("movie-button").addEventListener('click',() => getMovies(url, options));
getMovies(url, options)