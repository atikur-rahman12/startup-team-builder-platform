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

// Get All Approve Startups
export const getAllApprovedStartups = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/startups/approved`,
      { cache: "no-store" },
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching approved startups:", error);
    return [];
  }
};

// Get Opportunities by Startup ID
export const getOpportunitiesByStartupId = async (startupId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/startup/${startupId}`,
      { cache: "no-store" },
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching opportunities by startup ID:", error);
    return [];
  }
};

// Get All Opportunities
export const getAllOpportunities = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`,
      { cache: "no-store" },
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching all opportunities:", error);
    return [];
  }
};

// Get Single Opportunity
export const getOpportunityById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/opportunity/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get Founder Application
export const getFounderApplications = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/founder/applications/${email}`,
      { cache: "no-store" },
    );
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

//  (Accept/Reject)
export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/application/status/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false, message: "Network error occurred" };
  }
};

// Get Applicant's Own Applications
export const getUserApplications = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/applications/${email}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Block and Unblock user
export const toggleUserBlock = async (id, isBlocked) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/block/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBlocked }),
    },
  );

  return await res.json();
};

// Get all startups (ADMIN)
export const getAllStartups = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/startups`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Approve / Reject startup
export const updateStartupStatus = async (id, status) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/startup/status/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );

  return await res.json();
};

// Get All Transactions
export const getAllTransactions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payments`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Get Founder Dashboard Stats
export const getFounderDashboardStats = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/founder/dashboard/${email}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get Admin Dashboard Stats
export const getAdminStats = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return null;
  }
};

// Get and Read Notifications
export const getNotifications = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${email}`,
    {
      cache: "no-store",
    },
  );

  return await res.json();
};

export const markNotificationRead = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read/${id}`,
    {
      method: "PATCH",
    },
  );

  return await res.json();
};
