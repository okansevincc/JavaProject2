import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../imgs/products/penholder.jpg";

const ProductPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src={img}
        alt="Ürün Resmi"
        style={{ marginBottom: "20px", height: "200px", width: "200px" }}
      />
      <button
        style={{ width: "150px", padding: "10px" }}
        onClick={() => {
          localStorage.setItem("productId", JSON.stringify({ productId: 1 }));
          navigate("/purchase");
        }}
      >
        Satın Al
      </button>
    </div>
  );
};

export default ProductPage;
