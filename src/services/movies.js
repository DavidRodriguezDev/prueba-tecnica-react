const API_KEY = "8589e093";

export const searchMovies = async ({search}) => {
    if (search === "") return null //Si es vacío ni hacemos el fetching de datos.
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search;
  
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))
    } catch(e) {
        
        throw new Error("Error searching movies")
    }

    
}