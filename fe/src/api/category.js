const baseUrl = "http://localhost:8080/api";

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
