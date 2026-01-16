import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

// Lazy Pages
const Home = lazy(() => import("./components/pages/Home"));
const Gallery = lazy(() => import("./components/pages/Gallery"));

function App() {
  return (
    <BrowserRouter>
      <nav style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/gallery">Gallery</Link>
      </nav>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
