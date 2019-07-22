import React from "react";

const MovieInfo = props => {
  const { closeMovieInfo, currentMovie } = props;

  return (
    <div className="container">
      <div className="row">
        <i
          className="fas fa-arrow-left backArrow"
          onClick={() => closeMovieInfo()}
        >
          <span className="go-back">Go Back</span>
        </i>
      </div>
      <div className="row">
        <div className="col s12 m4">
          {currentMovie.poster_path == null ? (
            <img
              src={`https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`}
              alt="defalut"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                currentMovie.poster_path
              }`}
              alt="poster"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="col s12 m8">
          <div className="info-container">
            <p>{currentMovie.title}</p>
            <p>{currentMovie.release_date}</p>
            <p>{currentMovie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
