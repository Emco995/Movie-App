import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
// import StarRating from "./components/StarComponents/StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating}></StarRating>
//       <p>This Movie is {movieRating} stars rated</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    ></StarRating>
    <StarRating defaultRating={3}></StarRating>
    <Test></Test> */}
  </React.StrictMode>
);
