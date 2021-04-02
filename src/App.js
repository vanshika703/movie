import { useState } from "react";
import "./styles.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState(null);
  const [parental, setParental] = useState(null);
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

      const id = data.results[0].id.substring(7, 16);
      console.log(id);

      const reviewResponse = await fetch(
        `https://imdb8.p.rapidapi.com/title/get-ratings?tconst=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "e4a4acb90emsh66e91cfedbf52e5p1febabjsne85f34306aa7",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
          }
        }
      );

      const reviewData = await reviewResponse.json();
      console.log(reviewData);

      const parentalResponse = await fetch(
        `https://imdb8.p.rapidapi.com/title/get-parental-guide?tconst=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "e4a4acb90emsh66e91cfedbf52e5p1febabjsne85f34306aa7",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
          }
        }
      );

      const parentalData = await parentalResponse.json();
      console.log(parentalData.parentalguide);

      setMovie({
        ...data.results[0],
        review: reviewData.rating,
        parental: parentalData.parentalguide
      });
      /* setReview(reviewData.rating);
      setParental(parentalData.parentalguide); */
      console.log(parental);
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
              Actors : {movie.principals[0].name}, {movie.principals[1].name}
            </li>
            <li className="list-group-item">Rating : {movie.review}</li>
            <li className="list-group-item">
              Parental Guide : {movie.parental[0].label},
              {movie.parental[1].label}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
