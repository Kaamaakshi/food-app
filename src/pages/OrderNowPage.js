import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./OrderNowPage.css"; // Import CSS for styling

const OrderNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {}; // Fallback to empty object if no state

  // Ensure quantity is set to 1 if not available
  const initializeOrder = (order) => {
    return order.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default to 1 if quantity is missing or NaN
    }));
  };

  // State to track updated order items with quantities
  const [updatedOrder, setUpdatedOrder] = useState(
    initializeOrder(order || [])
  );
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  // Function to handle increasing quantity and updating price
  const handleIncreaseQuantity = (index) => {
    const newOrder = [...updatedOrder];
    newOrder[index].quantity += 1;
    setUpdatedOrder(newOrder); // Update state with new order
  };

  // Function to handle decreasing quantity (ensure quantity doesn't go below 1)
  const handleDecreaseQuantity = (index) => {
    const newOrder = [...updatedOrder];
    if (newOrder[index].quantity > 1) {
      newOrder[index].quantity -= 1; // Decrease quantity if greater than 1
      setUpdatedOrder(newOrder); // Update state with new order
    }
  };

  // Function to remove an item from the order
  const handleRemoveItem = (index) => {
    const newOrder = updatedOrder.filter((_, i) => i !== index);
    setUpdatedOrder(newOrder); // Update state with new order (without the removed item)
  };

  // Function to handle order confirmation
  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);

    // Simulate processing the order (this can be a network request)
    setTimeout(() => {
      setIsOrderConfirmed(false); // Reset the button state
      alert("Order confirmed! Thank you for your purchase.");

      // Redirect the user to another page (e.g., Home page or Order History)
      navigate("/"); // Replace with the route you want to redirect to after confirmation
    }, 2000); // Simulate processing time
  };

  return (
    <div className="order-now-container">
      <h1>Your Order</h1>
      {updatedOrder && updatedOrder.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {updatedOrder.map((item, index) => (
              <tr key={index} className="order-item">
                <td>{item.name}</td>
                <td>
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    +
                  </button>
                </td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-items">No items in the order.</p>
      )}

      {/* Confirm Order Button */}
      <div className="confirm-order-container">
        <button
          className="confirm-order-btn"
          onClick={handleConfirmOrder}
          disabled={isOrderConfirmed || updatedOrder.length === 0}
        >
          {isOrderConfirmed ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderNowPage;
