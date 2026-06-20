"use server";

export const getStartupByEmail = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/startup/${email}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const text = await response.text();
    if (!text) return null;

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching startup by email:", error);
    return null;
  }
};

export const addStartups = async (data) => {
  const resData = await serverMutation({
    path: "api/startups",
    method: "POST",
    data: data,
  });
  return resData;
};

export const serverMutation = async ({ path, method, data }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateStartup = async (email, formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/startup/${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating startup:", error);
    return { error: true, message: "Network error occurred" };
  }
};

export const deleteStartup = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/startup/${email}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on delete action wrapper:", error);
    return { error: true, message: "Failed to request data node deletion." };
  }
};

// 🆕 Add Opportunity Action
export const addOpportunity = async (data) => {
  const resData = await serverMutation({
    path: "api/opportunities",
    method: "POST",
    data: data,
  });
  return resData;
};

// 🆕 Get Opportunities by Founder Email
export const getOpportunitiesByEmail = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/${email}`,
      { cache: "no-store" },
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return [];
  }
};

// 🆕 Update Opportunity
export const updateOpportunity = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunity/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating opportunity:", error);
    return { success: false, message: "Network error occurred" };
  }
};

// 🆕 Delete Opportunity
export const deleteOpportunity = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunity/${id}`,
      { method: "DELETE" },
    );
    return await response.json();
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    return { success: false, message: "Failed to delete opportunity" };
  }
};

// Upgrade Premium User
export const upgradeToPremium = async (email) => {
  return await serverMutation({
    path: `api/users/upgrade-premium/${email}`,
    method: "PATCH",
  });
};
