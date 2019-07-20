import React from "react";
import Movie from "./Movie";

const MovieList = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.movies.map((movie, index) => {
            console.log(movie);
            return <Movie key={index} image={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
