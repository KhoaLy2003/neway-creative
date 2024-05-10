const baseUrl = process.env.REACT_APP_BACK_END_URL;

export async function createPost(postCreateDto) {
  try {
    const response = await fetch(`${baseUrl}/posts/admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postCreateDto),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch(`${baseUrl}/posts`);

    if (!response.ok) throw new Error("Failed to fetch posts");

    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
