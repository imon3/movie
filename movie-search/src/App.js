import React from "react";
import "./App.css";
import Nav from "./components/navbar/Nav";
import SearchArea from "./components/searchBox/SearchArea";
import MovieList from "./components/movies/MovieList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      searchTerm: ""
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
        this.setState({
          movies: [...data.results]
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <SearchArea
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
