// src/Pages/MovieDetail.jsx
import React, { useCallback, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../Components/ContextProvider";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const { setData, data, setLoading, loading, setError, error, APIKEY } =
    useContext(MyContext);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`
      );
      if (response.data.Response === "False") {
        setError(response.data.Error);
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError("Failed to fetch movie details");
      console.log(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id, APIKEY, setData, setError, setLoading]);

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  if (loading)
    return <p className="text-center mt-20">Loading movie details...</p>;
  if (error) return <p className="text-center text-red-600 mt-20">{error}</p>;
  if (!data) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Poster on Left (Centered on mobile) */}
          <div className="flex justify-center w-full md:w-1/3">
            <img
              src={data.Poster !== "N/A" ? data.Poster : "/no-image.png"}
              alt={data.Title}
              className="w-64 h-auto rounded"
            />
          </div>

          {/* Text on Right */}
          <div className="text-left w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{data.Title}</h1>
            <p>
              <strong>Year:</strong> {data.Year}
            </p>
            <p>
              <strong>Genre:</strong> {data.Genre}
            </p>
            <p>
              <strong>Director:</strong> {data.Director}
            </p>
            <p>
              <strong>Actors:</strong> {data.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {data.Plot}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {data.imdbRating}
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
