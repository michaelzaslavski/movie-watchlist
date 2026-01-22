const apikey = '5b895994'
const searchInput = document.getElementById('search')
const btnSearch = document.getElementById('btn-search')


async function search(){

const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}`)
const data = await res.json()
console.log(data)
if (data.Search){
    const moviedata = await Promise.all(
        data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movie.imdbID}`)
            return await res.json()
        })

    )
    const uniqueMovies = Array.from(new Map(moviedata.map(item => [item['imdbID'], item])).values())
    console.log(uniqueMovies) 
    renderMovies (uniqueMovies, 'movies-container', false)
    }
}
if (btnSearch){
btnSearch.addEventListener('click', search)
}

export function renderMovies(movies, containerId, isWatchlist=false){
    const container = document.getElementById(containerId)
    const moviesHTML = movies.map(movie => {
        return `
        <div class="movie">
             <h3>${movie.Title} (${movie.Year}) <span>⭐ ${movie.imdbRating}</span></h3>
             <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <div class="movie-info">
              <p>${movie.Runtime}</p>
             <p>${movie.Genre}</p>
             ${isWatchlist
             ? `<button class="remove-btn" data-id="${movie.imdbID}">- Remove</button>`
             : `<button class="add-btn" data-id="${movie.imdbID}">+ Watchlist</button>`
              }
             <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>

`}).join('')
    container.innerHTML = moviesHTML
}

const searchresultcon = document.getElementById('movies-container')

if (searchresultcon){
    searchresultcon.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('add-btn')) { 
            const movieId = e.target.dataset.id
            addtoWatchlist(movieId)
            console.log(movieId)
    }
    })
}

async function addtoWatchlist(movieId){
const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`)
const movie = await res.json()
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
if (!watchlist.some(m => m.imdbID === movie.imdbID)){
    watchlist.push(movie)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    alert(`${movie.Title} has been added to your watchlist!`)    

}else{
    alert(`${movie.Title} is already in your watchlist!`)
}
}

