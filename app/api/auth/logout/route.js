export async function POST(request) {
  const session = await auth();
  const accessToken = session.accessToken;

  await fetch(`${process.env.SERVER_URL}/v1/api/auth/logout`,
      {
          method: "POST",
          headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${accessToken}`
          },
          credentials: "include",
          cache: "force-cache"
      }
  );
};