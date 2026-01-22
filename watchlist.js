import{renderMovies} from './index.js'

function init(){
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    if(watchlist.length > 0){
    renderMovies(watchlist, 'watchlist-container', true)
} else {  
    document.getElementById('watchlist-container').innerHTML = `
    <div class="empty-state">
                <p>Your watchlist is looking a little lonely...</p>
                <a href="index.html">Search and add some movies!</a>
            </div>`
}
}
document.getElementById('watchlist-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const idToRemove = e.target.dataset.id
        let watchlist = JSON.parse(localStorage.getItem('watchlist'))
        
        // Remove the item from the array
        watchlist = watchlist.filter(movie => movie.imdbID !== idToRemove)
        
        // Update localStorage
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        
        // Refresh the UI
        init()
    }
})


init()
