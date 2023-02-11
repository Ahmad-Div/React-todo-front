import React from "react";

const About = () => {
  return (
    <section className="about">
      <h1 className="headers">About</h1>
      <p>This website designed and developed by Ahmad Software</p>
      <p>Ahmad Software is a Full-stack developer</p>
      <p>for more information and contact visit my personal website</p>
      <a target="_blank" href="https://www.ahmad-software.com">
        ahmad-software.com
      </a>
    </section>
  );
};
const homeLoader = async () => {
  const token = getCookie("user");
  try {
    const res = await getTokenData(GET_TOKEN_URL, token);
    return res;
  } catch (error) {
    return redirect("/auth/login");
  }
};

export { homeLoader };

export default About;
