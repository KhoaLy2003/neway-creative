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
