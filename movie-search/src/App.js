import React from "react";
import "./App.css";
import Nav from "./components/navbar/Nav";
import SearchArea from "./components/searchBox/SearchArea";
import MovieList from "./components/movies/MovieList";
import Pagination from "./components/pagination/Pagination";
import MovieInfo from "./components/movies/MovieInfo";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      searchTerm: "",
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    };

    this.apiKey = process.env.REACT_APP_API;
  }

  // Handle Submit method
  handleSubmit = e => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${
        this.state.searchTerm
      }`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results
        });
      })
      .catch(err => console.log(err));
  };

  // Handle Change Method
  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  // Go To Next Page Method
  nextPage = pageNumber => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${
        this.state.searchTerm
      }&page=${pageNumber}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          movies: [...data.results],
          currentPage: pageNumber
        });
      })
      .catch(err => console.log(err));
  };

  // View Clicked Movie Info
  viewMovieInfo = id => {
    const filteredMovie = this.state.movies.filter(movie => movie.id === id);
    if (filteredMovie.length > 0) {
      this.setState({
        currentMovie: filteredMovie
      });
    }
  };

  closeMovieInfo = () => {
    this.setState({
      currentMovie: null
    });
  };

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav />
        {this.state.currentMovie === null ? (
          <div>
            <SearchArea
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <MovieList
              movies={this.state.movies}
              viewMovieInfo={this.viewMovieInfo}
            />
          </div>
        ) : (
          <MovieInfo closeMovieInfo={this.closeMovieInfo} />
        )}

        {this.state.totalResults > 20 ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
