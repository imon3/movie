import React from "react";
import "./App.css";
import Nav from "./components/navbar/Nav";
import SearchArea from "./components/searchBox/SearchArea";
import MovieList from "./components/movies/MovieList";
import Pagination from "./components/pagination/Pagination";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      searchTerm: "",
      totalResults: 0,
      currentPage: 1
    };

    this.apiKey = process.env.REACT_APP_API;
  }

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

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

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

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav />
        <SearchArea
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <MovieList movies={this.state.movies} />
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
