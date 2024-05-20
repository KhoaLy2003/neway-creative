import React, { useEffect, useState } from 'react';

const ViewCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  return (
    <div>
      <h1>View Cart</h1>
      <ul>
        {cart.map((item, index) => {
          const calendarDetail = JSON.parse(item.calendarDetail);
          return (
            <li key={index}>
              <p>{`Title: ${calendarDetail.title}`}</p>
              <p>{`Description: ${calendarDetail.description}`}</p>
              <p>{`Selected Row: ${item.selectedRow}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewCart;
