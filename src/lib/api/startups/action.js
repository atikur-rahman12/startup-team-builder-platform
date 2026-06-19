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
