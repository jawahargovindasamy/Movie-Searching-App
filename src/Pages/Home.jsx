import React, { useCallback, useContext, useEffect } from "react";
import { MyContext } from "../Components/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {
    data,
    setData,
    Search_url,
    search,
    loading,
    setLoading,
    error,
    setError,
    page,
    setPage,
    type,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(Search_url);
      if (response.data.Response === "False") {
        setError(response.data.Error);
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setData(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [Search_url, setData, setError, setLoading]);

  // Reset page to 1 on new search
  useEffect(() => {
    setPage(1);
  }, [search, setPage, type]);

  useEffect(() => {
    if (!search) {
      setData(null);
      setError(null);
      return;
    }
    fetchData();
  }, [search, page, type, fetchData,setData, setError]);

  const totalPages = data?.totalResults
    ? Math.ceil(parseInt(data.totalResults) / 10)
    : 1;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Movie Search</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && data && data.Search && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.Search.map((movie) => (
            <div
              key={movie.imdbID}
              className="border p-2 rounded shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="font-semibold">{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalResults && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {!search && (
        <p className="text-center text-gray-600 mt-4">
          Type in the search box above to find movies.
        </p>
      )}
    </div>
  );
};

export default Home;
