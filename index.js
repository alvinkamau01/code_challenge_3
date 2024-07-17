document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = {
        poster: document.getElementById('poster'),
        title: document.getElementById('title'),
        runtime: document.getElementById('runtime'),
        showtime: document.getElementById('showtime'),
        availableTickets: document.getElementById('available-tickets'),
        buyTicketButton: document.getElementById('buy-ticket')
    };

     fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => {
            displayMovieDetails(movie)
        })

        function displayMovieDetails(movie) {
            movieDetails.poster.src = movie.poster
            movieDetails.title.innerText = movie.title
            movieDetails.runtime.innerText = `Runtime: ${movie.runtime} minutes`
            movieDetails.showtime.innerText = `Showtime: ${movie.showtime}`
            const availableTickets = movie.capacity - movie.tickets_sold
            movieDetails.availableTickets.textContent =checkSoldOut(movie)
            movieDetails.buyTicketButton.value =`${--movie.capacity}`
            function checkSoldOut(movie){
                if (availableTickets!==0){
                   return `Available Tickets: ${availableTickets}`
                }
                else{
                 return 'soldout'
                }
            
            }
        }

    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            const filmList = document.getElementById('films');
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.innerText = movie.title;
                li.dataset.id = movie.id;
                li.addEventListener('click', () => {
                    fetch(`http://localhost:3000/films/${movie.id}`)
                        .then(response => response.json())
                        .then(movieDetails => {
                            displayMovieDetails(movieDetails)
                        })
                })
                filmList.appendChild(li)
            })
        })
})
