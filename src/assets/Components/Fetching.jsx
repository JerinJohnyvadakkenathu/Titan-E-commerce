import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

function FetchingProvider({ children }) {  
  const [cont, setCont] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/product")
      .then((res) => setCont(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <ProductContext.Provider value={cont}>
      {children}
    </ProductContext.Provider>
  );
}

export default FetchingProvider;
