import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const About = ({ auth }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
  }, [auth.isAuthenticated]);

  return (
    <section className="about flex flex-column justify-left align-center w-100 gap-2 position-relative">
      <h1 className="headers">
        {t("about.header")} <span className="dot">.</span>
      </h1>
      <div className="aboutParagraph">
        <p className="aboutParagraph">{t("about.p0")}</p>
        <p className="aboutParagraph">{t("about.p1")}</p>
        <p className="aboutParagraph">{t("about.p2")}</p>
        <p className="aboutParagraph">{t("about.p3")}</p>
      </div>

      <div className="flex flex-row justify-center align-center gap-2 flex-wrap">
        <a target="_blank" href="https://www.ahmad-software.com" className="getStartButton">
          {t("about.visit")}
        </a>
        <button className="learnMoreButton"> {t("learnMore")}</button>
      </div>
      <div className="ball coloredBall big position-absolute"></div>
      <div className="ball coloredBall small position-absolute"></div>
      <div className="ball blackBall big position-absolute"></div>
      <div className="ball blackBall small position-absolute"></div>
    </section>
  );
};

About.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(About);

//  <section className="about">
//       <h1 className="headers">{t("about.header")}</h1>
//       <p>{t("about.p1")}</p>
//       <p>{t("about.p2")}</p>
//       <p>{t("about.p3")}</p>
//       <a target="_blank" href="https://www.ahmad-software.com">
//         ahmad-software.com
//       </a>
//     </section>
