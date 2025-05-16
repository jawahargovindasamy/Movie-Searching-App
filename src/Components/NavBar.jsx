import { useContext } from "react";
import { MyContext } from "../Components/ContextProvider";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { search, setSearch, type, setType } = useContext(MyContext);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2 justify-center md:justify-start">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/cinema-7642418-6185394.png"
            className="h-8 w-8 object-contain"
            alt="Logo"
          />
          <span className="text-xl sm:text-2xl font-semibold text-gray-800 text-center md:text-left">
            <Link to="/">Movie Searching App</Link>
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="w-full sm:w-64 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative w-full sm:w-auto">
            <select
              value={type}
              onChange={handleTypeChange}
              className="appearance-none w-full sm:w-40 p-2 border border-gray-300 rounded-lg text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
