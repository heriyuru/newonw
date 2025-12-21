'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AcceptedOrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders
  useEffect(() => {
    const restaurantId = localStorage.getItem("restid");

    if (!restaurantId) {
      alert("No Restaurant ID found in localStorage");
      setLoading(false);
      return;
    }

    const fetchAcceptedOrders = async () => {
      try {
        const res = await axios.get(`/api/accepted-orders?restaurantId=${restaurantId}`);

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          alert("Failed to fetch accepted orders");
        }
      } catch (err) {
        console.error("Fetch accepted orders error:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, []);



  if (loading) return <p>Loading accepted orders...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>✅ Accepted Orders</h2>

      {orders.length === 0 ? (
        <p>No accepted orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                marginBottom: '12px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f0fff0',
              }}
            >
              <p><strong>User ID:</strong> {order.userId}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Accepted On:</strong> {order.acceptedAt ? new Date(order.acceptedAt).toLocaleString() : 'N/A'}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <p><strong>Status:</strong> {order.status || "active"}</p>
              <p><strong>Item(s):</strong></p>
                <p style={{ fontSize: '1.1em', color: '#333' }}>
                Order ID: {order.orderId}
              </p>

              {Array.isArray(order.items) && order.items.length > 0 ? (
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} — ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                     
                 
                </ul>
              ) : (
                <p>No items found</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
