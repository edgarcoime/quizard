export default async function Page({}) {
  const loggedIn = false;
  const username = "johndoe";

  // Check if there is user logged in
  // if not, redirect to login page
  if (!loggedIn) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        distination: `/id/${username}`,
      },
    };
  }
}
