import { useState } from "react";
import "./styles.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(
        `https://imdb8.p.rapidapi.com/title/find?q=${search}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "e4a4acb90emsh66e91cfedbf52e5p1febabjsne85f34306aa7",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
          }
        }
      );

      const data = await response.json();
      console.log(data);
      setMovie(data.results[0]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <h1 className="mt-5">Movie Search</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => getData()}>SEARCH</button>
      </div>
      {movie && (
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={movie.image.url} alt="movie" />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Time : {movie.runningTimeInMinutes} minutes
            </li>
            <li className="list-group-item">Year : {movie.year}</li>
            <li className="list-group-item">
              Actors : {movie.principals[0].name}, {movie.principals[1].name},{" "}
              {movie.principals[2].name}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
