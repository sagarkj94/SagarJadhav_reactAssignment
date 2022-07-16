import axios from 'axios';
import IMovies from '../models/IMovies';

const getmovies = async(category:string) => {
    return await axios.get<IMovies[]>( `${process.env.REACT_APP_API_BASE_URL}/${category}` )
            .then( response => response.data )
};

const getmoviesByTitle = async( title : string, category:string ) => {
    return await axios.get<IMovies[]>( `${process.env.REACT_APP_API_BASE_URL}/${category}?title=${title}` )
            .then( response => response.data )
};

const saveFavourite = async (title: string, category:string) => {
    const data = await getmoviesByTitle(title, category)
    const movie = data[0]
    const { actors, averageRating, contentRating, duration, genres, imdbRating, originalTitle, 
    poster, posterurl, ratings, releaseDate, storyline, year } = movie as IMovies
    let movieDetails = {
        actors, averageRating, contentRating, duration, genres, imdbRating, originalTitle, 
        poster, posterurl, ratings, releaseDate, storyline, title, year
    }
    return (
        await axios.post("http://localhost:3000/favourit", movieDetails, {
            headers : {'Content-Type': 'application/json'}
            }).then (response => response.status)
    )
}


const deleteFavouriteById = async(id:string) => {
    return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/favourit/${id}`)
        .then(response => response.status)
}

export {
    getmovies,
    getmoviesByTitle,
    saveFavourite,
    deleteFavouriteById
};