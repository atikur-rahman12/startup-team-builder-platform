import { authHeader } from "./startups/action";

export const serverFetch = async (path) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  return res.json();
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    {
      headers: await authHeader()
    }

  );

  return res.json();
};
