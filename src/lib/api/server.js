export const serverMutation = async ({ path, method, data }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: method,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const serverFetch = async ({ path }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  return res.json();
};
