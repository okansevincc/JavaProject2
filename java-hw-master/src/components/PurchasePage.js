import axios from "axios";
import React, { useEffect, useState, useNavigate } from "react";
import jwtDecode from "../utils/jwtDecode";
import getConfig from "../utils/getConfig";

const API_PURCHASE_URL = "http://localhost:8080/api/v1/purchase";
const API_BOUGHT_URL = "http://localhost:8080/api/v1/bought";

const PurchasePage = () => {
  const navigate = useNavigate();

  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const userId = jwtDecode(localStorage.getItem("tokenKey"));
  const config = getConfig();

  useEffect(() => {
    axios
      .get(API_BOUGHT_URL + "/" + userId, config)
      .then((res) => {
        setIsBought(res.data);
      })
      .catch(() => alert(() => "Something went wrong!"));
  }, []);

  const handlePurchase = (e) => {
    e.preventDefault();

    if (isBought) {
      alert("You have already bought this product!");
      return;
    }

    const purchaseRequest = {
      id: userId,
      isBought: true,
    };

    axios
      .put(API_PURCHASE_URL, purchaseRequest, config)
      .then((res) => {
        console.log("Satın alma işlemi gerçekleşti!");
      })
      .catch(() => alert(() => "Something went wrong!"));

    setPurchaseCompleted(true);
  };

  const handleReturn = () => {
    const purchaseRequest = {
      id: userId,
      isBought: false,
    };

    axios
      .put(API_PURCHASE_URL, purchaseRequest, config)
      .then((res) => {
        console.log("Satın alma işlemi gerçekleşti!");
      })
      .catch(() => alert(() => "Something went wrong!"));

    setIsBought(false);
    setPurchaseCompleted(true);

    navigate("/product");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      {isBought ? (
        <button
          style={{ margin: "auto", display: "block" }}
          onClick={handleReturn}
        >
          Iade et
        </button>
      ) : (
        <>
          <form
            onSubmit={handlePurchase}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "300px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label>
                Card Number:
                <input type="text" name="cardNumber" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Expiry Date:
                <input type="text" name="expiryDate" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                CVV:
                <input type="text" name="cvv" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Full Name:
                <input type="text" name="fullName" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Address:
                <input type="text" name="address" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                City:
                <input type="text" name="city" required />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Postal Code:
                <input type="text" name="postalCode" required />
              </label>
            </div>
            <div style={{ marginBottom: "40px" }}></div>
          </form>

          {purchaseCompleted ? (
            <p>Satın alma işlemi gerçekleşti!</p>
          ) : (
            <form
              onSubmit={handlePurchase}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "300px",
              }}
            >
              <button type="submit" style={{ width: "100px" }}>
                Buy
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default PurchasePage;
