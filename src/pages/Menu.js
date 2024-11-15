import React, { useState } from "react";
import { MenuList } from "../data/data"; // Assuming your menu list is in data.js
import { useNavigate } from "react-router-dom"; // For navigation
import Layout from "./../components/Layout/Layout";
const Menu = () => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  // Handle the order button click
  const handleOrderClick = (menuItem) => {
    setOrder((prevOrder) => [...prevOrder, menuItem]);
  };

  // Navigate to the Order page with the selected items
  const handleGoToOrderPage = () => {
    navigate("/order-now", { state: { order } });
  };

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Menu</h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {MenuList.map((menu) => (
            <div
              key={menu.id}
              style={{
                width: "300px",
                margin: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <img
                src={menu.image}
                alt={menu.name}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px" }}>
                <h3>{menu.name}</h3>
                <p>{menu.description}</p>
                <p style={{ fontWeight: "bold" }}>Price: ₹{menu.price}</p>
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: "#008CBA",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => handleOrderClick(menu)}
                >
                  Add Item
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Now button */}
        {order.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleGoToOrderPage}
            >
              Go to Order Now Page
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
