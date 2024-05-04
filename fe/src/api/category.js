const baseUrl = process.env.REACT_APP_BACK_END_URL;

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};
