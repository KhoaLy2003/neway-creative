const baseUrl = process.env.REACT_APP_BACK_END_URL;

export async function createPayment(paymentCreateDto) {
  try {
    const response = await fetch(`${baseUrl}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentCreateDto),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment");
    }

    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function saveOrder(orderDto) {
  try {
    const response = await fetch(`${baseUrl}/payment/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDto),
    });

    if (!response.ok) {
      throw new Error("Failed to save order");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateOrder(orderDto) {
  try {
    const response = await fetch(`${baseUrl}/payment/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDto),
    });

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
