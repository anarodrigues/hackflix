// Catalogue.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// import a Link component
import { Link } from 'react-router-dom';

const Catalogue = () => {
    const currentYear = new Date().getFullYear()+1;
    const [movies, setMovies] = useState([]);
    const [year, setYear] = useState(currentYear);
    const options = [{ value: currentYear, label: currentYear }];
    for (let y = currentYear - 1; y >= 1941; y--) {
            options.push({ value: y, label: y });
    }

    useEffect(() => {
        
        // After the component has been added to the DOM make our API call...
        axios({
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'f012df5d63927931e82fe659a8aaa3ac',
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: 1,
                primary_release_year: year,
            },
        }).then((res) => {
            const movieResults = res.data.results;
            // Store the API results to the "movies" state value...
            setMovies(movieResults);
        })
    }, [year]);

    const handleChange = (event) => {
        setYear(event.value);
    }


    return (
        <>
            <Select
                options={options}
                onChange={(event) => { handleChange(event) }}
                defaultValue={{label: currentYear, value: currentYear}}
            />

            <div className="catalogue">

                {movies.map((movie) => (
                    <div key={movie.id} className="movie">
                        {
                            // wrap the Link component around each Catalogue image and 
                            // set the "to" attribute to our route's URL path with movie ID stored in our API data 
                        }
                        <Link to={`/movie/${movie.id}`}>
                            {movie.poster_path ?
                                <img
                                    alt={`Poster for movie ${movie.title} from ${year}`}
                                    src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                /> :
                                <>
                                    
                                    <h2>{movie.title}</h2>
                                    <p>No image available</p>
                                </>
                            }
                        </Link>
                    </div>
                )
                )}
            </div>
        </>
    );
}

export default Catalogue;