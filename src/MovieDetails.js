// MovieDetails.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = (props) => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const { movieID } = props.match.params;
        //console.log(props.match.params);

        axios({
            url: `https://api.themoviedb.org/3/movie/${movieID}`,
            params: {
                api_key: 'f012df5d63927931e82fe659a8aaa3ac',
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: '1'
            },
        }).then((res) => {
            //console.log(res.data);
            setMovie(res.data);
        })
    }, [props.match.params]);


    const { original_title, tagline, overview, poster_path, release_date } = movie;
    return (
        <div className="poster">
            <div className="description">
                <h1>{original_title}</h1>
                <p>Release date: {release_date}</p>
                <h2>{tagline}</h2>
                <p>{overview}</p>
            </div>
            <div className="image">
                {(poster_path) ?
                    <img src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt={`Movie poster for ${original_title}`} />
                    : null
                }
            </div>
        </div>
    );
}

export default MovieDetails;