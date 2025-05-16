// src/Components/ContextProvider.jsx
import { createContext, useState } from "react";

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const APIKEY = "b1a5a6bd";
  const [type, setType] = useState("");
  const Search_url = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}${
    type ? `&type=${type}` : ""
  }`;

  const value = {
    data,
    setData,
    search,
    setSearch,
    Search_url,
    loading,
    setLoading,
    error,
    setError,
    APIKEY,
    page,
    setPage,
    type,
    setType,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ContextProvider;
