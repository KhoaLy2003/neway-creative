const baseUrl = process.env.REACT_APP_BACK_END_URL;

export const fetchOrderHistory = async (customerId) => {
  try {
    const response = await fetch(
      `${baseUrl}/orders/${customerId}/order-history`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchOrderHistoryAdmin = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders/admin/orders`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchCustomerOrderDetail = async (customerId, orderId) => {
  try {
    const response = await fetch(
      `${baseUrl}/orders/${customerId}/order-history/${orderId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch customer order detail");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer order detail:", error);
    return null;
  }
};

export const uploadOrderData = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/testing/upload-order-data`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload order data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading order data:", error);
    throw error;
  }
};

export const fetchTotalPriceOfCompletedOrders = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/orders/total-price/completed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch total price of completed orders");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching total price of completed orders:", error);
    return null;
  }
};
