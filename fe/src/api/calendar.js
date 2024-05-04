const baseUrl = "http://localhost:8080/api";

export const getLatestCalendars = async () => {
  try {
    const response = await fetch(`${baseUrl}/calendars/latest`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
};

export const fetchCalendarsByCategory = async (categoryId, pageNo) => {
  try {
    let url = `${baseUrl}/calendars/?pageNo=${pageNo}`;
    if (categoryId !== null) {
      url = `${baseUrl}/calendars/category?categoryId=${categoryId}&pageNo=${pageNo}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch calendars by category");
    }
    const data = await response.json();
    return data.data.content;
  } catch (error) {
    console.error("Error fetching calendars by category:", error.message);
    throw error;
  }
};

export const fetchCalendarDetail = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/calendars/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch calendar detail");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching calendar detail:", error.message);
    throw error;
  }
};

export const fetchCalendarsInAdminRole = async (pageNo) => {
  try {
    let url = `${baseUrl}/calendars/admin/list/?pageNo=${pageNo}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch calendars in admin role");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching calendars in admin role:", error.message);
    throw error;
  }
};

export const createCalendar = async (calendar) => {
  //const jsonData = JSON.stringify(calendar);
  console.log(calendar);

  try {
    let url = `${baseUrl}/calendars/admin/create`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(calendar),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error create calendar", error.message);
    throw error;
  }
};

export const uploadCalendarImage = async (calendarId, formData) => {
  try {
    let url = `${baseUrl}/calendars/admin/upload?id=${calendarId}`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error upload calendar image", error.message);
    throw error;
  }
};
