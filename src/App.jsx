import './App.css'
import { useMovies } from './hooks/useMovies';
import { Movies } from './components/Movies';
import { useEffect, useState, useRef, useCallback } from 'react';
import debounce from "just-debounce-it"

function useSearch () {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true) //Para que no nos salte el mensaje de error nada más cargar la página.

  useEffect(() => {

    if(isFirstInput.current) {  
      isFirstInput.current = search === "";
      return //Para evitar que haga las validaciones.
    }

    if(search === "") {
      setError("No se puede buscar una película vacía")
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({search, sort});
  
  const debouncedGetMovies = useCallback(
      debounce(search => {
      console.log("search", search)
      getMovies({search})
  }, 1400)
  , []
)

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({search}) //Aquí vamos a hacer el debounce.
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort);
  }

  return (
    <div className="App">
      <header>
        <h1>Prueba técnica - Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{ border: error ? "1px solid red" : "transparent"}} onChange={handleChange} value={search} placeholder='Avengers, Star Wars, The Matrix...'></input>
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color : "red", display: "flex", justifyContent: "center"}}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies}/>}
      </main>
      
    </div>
  )
}

export default App
