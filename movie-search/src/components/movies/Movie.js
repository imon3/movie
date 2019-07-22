import React from "react";

const Movie = props => {
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-affect waves-block waves-light">
          {props.image == null ? (
            <img
              src={`https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`}
              alt="movie cover art"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${props.image}`}
              alt="movie thumbnail"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="card-content">
          <p>
            <a href="#" onClick={() => props.viewMovieInfo(props.movieId)}>
              View Details
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
