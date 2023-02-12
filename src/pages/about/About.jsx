import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="about">
      <h1 className="headers">{t("about.header")}</h1>
      <p>{t("about.p1")}</p>
      <p>{t("about.p2")}</p>
      <p>{t("about.p3")}</p>
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
