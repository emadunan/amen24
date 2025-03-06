import { GetServerSidePropsContext } from "next";

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

  const res = await fetch("http://localhost:5000/users/me", {
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
