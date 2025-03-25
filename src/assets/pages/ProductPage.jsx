import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Components/Fetching";
import Navbar from "../Home/Navbar";
import ProductModal from "./ProductModal";

const ProductPage = () => {
  const products = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "all"
  );
  const [priceRange, setPriceRange] = useState(
    Number(localStorage.getItem("priceRange")) || 10000
  );
  const [id, setId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setId(localStorage.getItem("userId") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("priceRange", priceRange);
  }, [selectedCategory, priceRange]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" ||
        product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
      product.price <= priceRange
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          Discover Something Extraordinary
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          
          <div className="lg:w-3/4">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded text-sm">
                          ${product.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="font-bold text-lg mb-1">{product.title}</h2>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {product.description || "Explore this amazing product"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {product.category === "Men" ? "Men's" : "Women's"}
                          </span>
                          <button className="text-indigo-600 text-sm font-medium">
                            Explore →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="inline-block w-8 h-8 border-t-2 border-indigo-500 rounded-full animate-spin mb-2"></div>
                    <p>Loading products...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/4">
            <div className="sticky top-20 bg-white rounded-lg p-4 shadow border">
              <h2 className="text-xl font-bold mb-4">Filters</h2>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {["all", "Men", "Women"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full py-2 px-3 rounded text-left ${
                        selectedCategory === category
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category === "all" ? "All Products" : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between mt-1 text-sm">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  onClick={() => console.log("Filters applied")}
                >
                  Apply Filters
                </button>
                <button
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange(10000);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          id={id}
        />
      )}
    </>
  );
};

export default ProductPage;