import { GetServerSidePropsContext } from "next";

const apiUrl = process.env.API_URL;

export async function withAuth(
  context: GetServerSidePropsContext,
  mode: "strict" | "non",
) {
  const { req } = context;
  const token = req.cookies.access_token;

  if (!token) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  const res = await fetch(`${apiUrl}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok && mode === "strict") {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  if (!res.ok) return null;

  const user = await res.json();

  return { props: { user } };
}
