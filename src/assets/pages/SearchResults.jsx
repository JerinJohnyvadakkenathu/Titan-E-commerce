import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../Components/Fetching";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const products = useContext(ProductContext);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (query) {
      const results = products.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
    setLoading(false);
  }, [query, products]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Search Results for: <span className="text-blue-600">"{query}"</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 hover:border-blue-300"
            >
              <Link to={`/product/${item.id}`} className="block">
                <div className="aspect-square bg-gray-100 mb-3 flex items-center justify-center rounded-md overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">{item.category}</div>
                  )}
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                {item.price && (
                  <p className="text-blue-600 font-bold">${parseFloat(item.price).toFixed(2)}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">{item.category}</p>
              </Link>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No results found for "{query}"</p>
          <p className="text-gray-500 text-sm">
            Try checking your spelling or using more general terms
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
