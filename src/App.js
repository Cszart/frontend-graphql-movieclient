import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./routes/Movies";
import MovieDetail from "./routes/Movie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
