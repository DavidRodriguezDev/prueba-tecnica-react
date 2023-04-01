import { useRef, useState, useMemo } from "react";
import { searchMovies } from "../services/movies";

export function useMovies ({search, sort}) {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previewSearch = useRef(search)

  const getMovies = useMemo(() => {
    return async({search}) => {
  
      if (search === previewSearch.current) return
      
      try {
        setLoading(true);
        setError(null)
        previewSearch.current = search;
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
  
      } catch (e) {
        
        setError(e.message)
  
      } finally {
        
        setLoading(false)
  
      }
      
    }
  }, [search]) 
    
  const sortedMovies = useMemo(() => {
    return sort //Para ordenar las películas por título.
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) 
    : movies
  }, [sort, movies]) //Dependencias por las cuales el useMemo volverá a renderizar.

  
  return {movies : sortedMovies, getMovies, loading}
  
  }