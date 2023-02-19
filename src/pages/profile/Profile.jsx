import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useChart from "../../hooks/useChart";
import useSize from "../../hooks/useSize";
import PropTypes from "prop-types";
import { deleteUser, updateUser, uploadImage, updateNotificationUser } from "../../actions/user";
import { Switch, FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import moment from "moment";
import { logout } from "../../actions/auth.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTodoChart, getPlanChart } from "../../actions/chart";
const Profile = ({
  auth,
  deleteUser,
  user,
  updateUser,
  uploadImage,
  logout,
  getTodoChart,
  getPlanChart,
  updateNotificationUser,
  chart,
}) => {
  let todoMax = 0;
  let planMax = 0;
  const { t, i18n } = useTranslation();

  const [breakpoint, setBreakpoint] = useState(useSize());
  const [wantDelete, setWantDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(auth.user.name);
  const [File, setFile] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const textRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    getTodoChart(auth.user.id);
    getPlanChart(auth.user.id);
    chart.plans?.forEach((plan) => {
      if (plan.count > planMax) {
        planMax = plan.count;
      }
    });
    chart.todos?.forEach((todo) => {
      if (todo.count > todoMax) {
        todoMax = todo.count;
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setBreakpoint(useSize());
    });
    return () => {
      window.removeEventListener("resize", () => {
        //
      });
    };
  }, [window.innerWidth]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
  }, [auth]);

  const deleteAccount = async () => {
    await deleteUser(auth.user._id);
    navigate("/auth");
  };

  const onUpdate = async () => {
    let body = {
      name: input,
    };
    if (imageChanged) {
      if (File !== "") {
        const formData = new FormData();
        const fileName = File.name;
        formData.append("name", fileName);
        formData.append("userImageUpload", File);
        const res = await uploadImage(formData, auth.user._id);
        body.image = res.data.url;
      } else {
        body.image = "";
      }

      //request to firebase
    }

    await updateUser(auth.user._id, body);
    setUpdate(false);
  };

  //handle changing the file input
  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setImageChanged(true);
    setUpdate(true);
  };

  const onLogout = async () => {
    logout();
    return navigate("/auth");
  };

  //profile header

  const profileHeader = (
    <div className="profileHeader flex flex-row justify-between align-center w-100 gap-1">
      <div
        className={
          i18n.language === "en"
            ? "flex flex-row justify-left align-center gap-1 w-100"
            : "flex flex-row justify-right align-center gap-1 w-100"
        }
      >
        {auth.user.image ? (
          <img className="image" src={auth.user.image} alt="" />
        ) : (
          <div className="image flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>
        )}
        <p>{auth.user.name}</p>
      </div>
      <div
        className={
          i18n.language === "en"
            ? "flex flex-row justify-right align-center gap-1 w-100"
            : "flex flex-row justify-left align-center gap-1 w-100"
        }
      >
        <span>
          {t("profile.addedOn")} &nbsp;&nbsp;
          <small>
            {moment(auth.user.createdAt).format("MMMM Do YYYY")} {moment(auth.user.createdAt).format("dddd")}
          </small>
        </span>
        <button type="button" onClick={() => setWantDelete(true)} className="delete flex flex-row justify-center align-center">
          <i className="fa-solid fa-trash-can"></i>
          {breakpoint !== "sm" && <span>{t("profile.delete")}</span>}
        </button>
      </div>
    </div>
  );

  const deleteBox = (
    <div className="deleteProfileBox flex flex-row justify-center align-center gap-1 flex-wrap">
      <h3 className="w-100">{t("profile.deleteBox")}</h3>
      <button className="yes" onClick={deleteAccount}>
        {t("profile.yes")}
      </button>
      <button className="no" onClick={() => setWantDelete(false)}>
        {t("profile.no")}
      </button>
    </div>
  );

  function handleCopy() {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
    }
  }

  return (
    <>
      {wantDelete && (
        <>
          {deleteBox} <div className="opaBackground"></div>
        </>
      )}
      <section className="profile  flex flex-column justify-left align-start gap-3 w-100">
        {profileHeader}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate();
          }}
          className="w-100 flex flex-row justify-center align-start gap-2 flex-wrap"
        >
          <div className="leftSide flex flex-column justify-left align-start gap-2">
            <div className="imageDiv flex flex-column justify-left align-start gap-1">
              <p>{t("profile.profileImage")}</p>
              {auth.user.image && !File ? (
                <img className="image" src={auth.user.image} alt="" />
              ) : File ? (
                <img className="image" src={URL.createObjectURL(File)} alt="" />
              ) : (
                <div className="image flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>
              )}
              <div className="w-100">
                <input
                  style={{
                    display: "none",
                  }}
                  type="file"
                  name="image"
                  id="image"
                  onChange={changeFile}
                />
                <label className="updateImage flex flex-row justify-center align-center w-100" htmlFor="image">
                  <span>
                    <i className="fa-regular fa-image"></i>
                  </span>
                  <span>{t("profile.changeImage")}</span>
                </label>
              </div>
            </div>
            <div className="detail flex flex-column justify-left align-start gap-1">
              <p>{t("profile.userDetails")}</p>
              <div className="inputDiv">
                <span>{t("profile.name")}</span>
                {update ? (
                  <input onChange={(e) => setInput(e.target.value)} value={input} type="text" name="name" id="name" />
                ) : (
                  <p>{auth.user.name}</p>
                )}
              </div>

              <div className="inputDiv">
                <span>{t("profile.username")}</span>
                <p>{auth.user.username}</p>
              </div>

              <div className="inputDiv">
                <span>{t("profile.email")}</span>
                <div className="flex flex-row justify-between align-center">
                  <input type="email" readOnly value={auth.user.email} ref={textRef} />

                  <span onClick={handleCopy}>
                    <i className="fa-solid fa-copy"></i>
                  </span>
                </div>
              </div>
            </div>

            {update ? (
              <div
                className={
                  i18n.language === "en"
                    ? "flex flex-row justify-left align-center gap-1 w-100 flex-wrap"
                    : "flex flex-row justify-right align-center gap-1 w-100 flex-wrap"
                }
              >
                <button type="submit" disabled={user.loading} className="save">
                  {user.loading ? <Spinner /> : t("profile.save")}
                </button>
                <button
                  onClick={() => {
                    setUpdate(false);
                    setFile("");
                    setInput(auth.user.name);
                  }}
                  className="cancel"
                >
                  {t("cancel")}
                </button>
              </div>
            ) : (
              <button onClick={() => setUpdate(true)} className="update">
                {t("update")}
              </button>
            )}
          </div>

          <div className="rightSide flex flex-column justify-left align-start gap-1">
            <p>{t("profile.setting")}</p>
            <div dir={i18n.language === "en" ? "ltr" : "rtl"} className="settingBox flex flex-row justify-between align-center">
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  className="
                form"
                  htmlFor="email-alerts"
                  mb="0"
                >
                  {t("profile.emailAlert")}
                </FormLabel>
                <Switch
                  onChange={() => {
                    updateNotificationUser(auth.user._id);
                  }}
                  isChecked={auth.user.notification}
                  id="email-alerts"
                />
              </FormControl>
            </div>
            <p>{t("profile.userStatus")}</p>
            <button type="button" onClick={onLogout} className="logout">
              {t("profile.logout")}
            </button>
          </div>
        </form>

        {/* todo chart */}
        <h3
          style={{
            fontWeight: "400",
          }}
        >
          {t("profile.numOfTodo")}
        </h3>
        <LineChart
          fontSize={breakpoint === "xl" ? 16 : breakpoint === "lg" ? 13 : breakpoint === "md" ? 8 : breakpoint === "sm" ? 7 : null}
          width={breakpoint === "xl" ? 850 : breakpoint === "lg" ? 700 : breakpoint === "md" ? 500 : breakpoint === "sm" ? 350 : null}
          height={breakpoint === "xl" ? 600 : breakpoint === "lg" ? 500 : breakpoint === "md" ? 400 : breakpoint === "sm" ? 300 : null}
          data={chart.todos}
          title="number of todos completed"
          stroke="#ffc700"
        >
          <CartesianGrid stroke="#ffc700" strokeDasharray="4 4" />
          <XAxis stroke="#ffc700" dataKey="day" />
          <YAxis stroke="#ffc700" type="number" domain={[0, todoMax]} /> <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#ffc700" />
        </LineChart>
        {/* plan chart */}
        <h3
          style={{
            fontWeight: "400",
          }}
        >
          {t("profile.numOfPlan")}
        </h3>

        <LineChart
          fontSize={breakpoint === "xl" ? 16 : breakpoint === "lg" ? 13 : breakpoint === "md" ? 8 : breakpoint === "sm" ? 7 : null}
          width={breakpoint === "xl" ? 850 : breakpoint === "lg" ? 700 : breakpoint === "md" ? 500 : breakpoint === "sm" ? 350 : null}
          height={breakpoint === "xl" ? 600 : breakpoint === "lg" ? 500 : breakpoint === "md" ? 400 : breakpoint === "sm" ? 300 : null}
          data={chart.plans}
          title="number of todos completed"
          stroke="#ffc700"
        >
          <CartesianGrid stroke="#ffc700" strokeDasharray="4 4" />
          <XAxis stroke="#ffc700" dataKey="day" />
          <YAxis stroke="#ffc700" type="number" domain={[0, planMax]} /> <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#ffc700" />
        </LineChart>
      </section>
    </>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateNotificationUser: PropTypes.func.isRequired,

  uploadImage: PropTypes.func.isRequired,
  getTodoChart: PropTypes.func.isRequired,
  getPlanChart: PropTypes.func.isRequired,

  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chart: state.chart,
});

export default connect(mapStateToProps, {
  deleteUser,
  updateUser,
  uploadImage,
  updateNotificationUser,
  logout,
  getTodoChart,
  getPlanChart,
})(Profile);
