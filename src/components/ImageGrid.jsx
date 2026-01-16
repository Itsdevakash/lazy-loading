import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    if (loading) return; 

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=6`
      );

      setImages((prev) => [...prev, ...res.data]);
    } catch (err) {
      setError(" Failed to load images");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {error && (
        <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px"
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt="img"
            height="150"
            loading="lazy"
            style={{ width: "100%", objectFit: "cover" }}
          />
        ))}

       
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      </div>

      {loading && (
        <h3 style={{ textAlign: "center", margin: "20px" }}>
          🔄 Loading more images...
        </h3>
      )}
    </>
  );
};

export default ImageGrid;
