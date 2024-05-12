const baseUrl = process.env.REACT_APP_BACK_END_URL;

export const getRelatedCalendars = async (calendarId) => {
  console.log("ID", calendarId);
  try {
    const response = await fetch(`${baseUrl}/calendars/${calendarId}/related`);

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

export const fetchCalendarsInAdminRole = async (pageNo, token) => {
  try {
    let url = `${baseUrl}/calendars/admin/list/?pageNo=${pageNo}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
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

export const createCalendar = async (calendar, token) => {
  console.log(calendar);

  try {
    let url = `${baseUrl}/calendars/admin/create`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(calendar),
      headers: {
        Authorization: `Bearer ${token}`,
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

export const uploadCalendarImage = async (calendarId, formData, token) => {
  try {
    let url = `${baseUrl}/calendars/admin/upload?id=${calendarId}`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error upload calendar image", error.message);
    throw error;
  }
};

export const fetchCalendarDetailInAdminRole = async (id, token) => {
  try {
    let url = `${baseUrl}/calendars/admin/${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
