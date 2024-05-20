const baseUrl = process.env.REACT_APP_BACK_END_URL;
const errMsg = "Failed to get response from server";
const ACCEPT_LANGUAGE = "vi";

export const login = async (loginRequest) => {
  let url = `${baseUrl}/customers/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": ACCEPT_LANGUAGE,
      },
    });

    if (response.ok || response.status === 404 || response.status === 400) {
      // throw new Error({ errMsg });
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};

export const register = async (registerRequest) => {
  let url = `${baseUrl}/customers/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(registerRequest),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": ACCEPT_LANGUAGE,
      },
    });

    if (!response.ok) {
      throw new Error({ errMsg });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};

export const verify = async (verifyRequest) => {
  let url = `${baseUrl}/customers/verify`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(verifyRequest),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": ACCEPT_LANGUAGE,
      },
    });

    if (!response.ok) {
      throw new Error({ errMsg });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};

export const regenerateOtp = async (email) => {
  let url = `${baseUrl}/customers/regenerate-otp`;
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Accept-Language": ACCEPT_LANGUAGE,
      },
    });

    if (!response.ok) {
      throw new Error({ errMsg });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};
