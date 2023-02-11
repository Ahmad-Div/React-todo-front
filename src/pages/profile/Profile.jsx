import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useChart from "../../data/chart";
import useSize from "../../hooks/useSize";
import PropTypes from "prop-types";
import { deleteUser, updateUser, uploadImage } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Profile = ({ auth, deleteUser, user, updateUser, uploadImage }) => {
  let max = 0;
  const { t, i18n } = useTranslation();
  const data = useChart();
  const [breakpoint, setBreakpoint] = useState(useSize());
  const [wantDelete, setWantDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(auth.user.name);
  const [file, setFile] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    data.forEach((day) => {
      if (day.todos > max) max = day.todos;
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

  if (!auth.isAuthenticated) {
    return navigate("/auth/login");
  }

  const deleteAccount = async () => {
    await deleteUser(auth.user._id);
    navigate("/auth/login");
  };

  const onUpdate = async () => {
    let body = {
      name: input,
    };
    if (imageChanged) {
      if (file !== "") {
        const formData = new FormData();
        const fileName = file.name;
        formData.append("name", fileName);
        formData.append("userImageUpload", file);
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

  //userImage

  const removeImage = (
    <div className="userImageButtons flex flex-row justify-center align-center gap-2">
      <span
        onClick={() => {
          setFile("");
          setUpdate(true);
          setImageChanged(true);
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </span>
    </div>
  );

  const userImage = (
    <>
      {file === "" && !imageChanged ? (
        <>
          {auth.user.image !== "" ? (
            <div className="updateImageForm  flex flex-column justify-center  align-center gap-1">
              <input onChange={changeFile} style={{ display: "none" }} type="file" name="userImageUpload" id="userImageUpload" />
              <label htmlFor="userImageUpload">
                <img className="profileImage" src={auth.user.image} alt="" />
              </label>
              {removeImage}
            </div>
          ) : (
            <div className="updateImageForm  flex flex-column justify-center  align-center gap-1">
              <input onChange={changeFile} style={{ display: "none" }} type="file" name="userImageUpload" id="userImageUpload" />
              <label htmlFor="userImageUpload">
                <div className="tempUserImage flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>{" "}
              </label>
              {removeImage}
            </div>
          )}
        </>
      ) : file === "" && imageChanged ? (
        <div className="updateImageForm  flex flex-column justify-center  align-center gap-1">
          <input onChange={changeFile} style={{ display: "none" }} type="file" name="userImageUpload" id="userImageUpload" />
          <label htmlFor="userImageUpload">
            <div className="tempUserImage flex flex-row  justify-center align-center">{auth.user.name.charAt(0).toUpperCase()}</div>{" "}
          </label>
        </div>
      ) : (
        <div className="updateImageForm  flex flex-column justify-center  align-center gap-1">
          <input onChange={changeFile} style={{ display: "none" }} type="file" name="userImageUpload" id="userImageUpload" />
          <label htmlFor="userImageUpload">
            <img className="profileImage" src={URL.createObjectURL(file)} alt="" />
          </label>
          {removeImage}
        </div>
      )}
    </>
  );

  const deleteBox = (
    <div className="deleteUserBox">
      <h3>{t("profile.deleteBox")}</h3>
      <div className="deleteOptionsButton flex flex-row justify-center align-center gap-2 w-100 flex-wrap">
        <button onClick={deleteAccount} className="yes">
          <span>{t("profile.yes")}</span>
        </button>

        <button onClick={() => setWantDelete((prev) => !prev)} className="no">
          <span>{t("profile.no")}</span>
        </button>
      </div>
    </div>
  );

  const nameField = update ? (
    <div className="profileDetail">
      <p>Name:</p>
      <div className="flex flex-row justify-between align-center w-100  gap-1">
        <input type="text" value={input} autoFocus onChange={(e) => setInput(e.target.value)} name="name" id="name" />
        <i
          onClick={() => {
            setUpdate(false);
            setInput(auth.user.name);
          }}
          className="fa-solid fa-xmark"
        ></i>
      </div>
    </div>
  ) : (
    <div className="profileDetail">
      <p>{t("profile.name")}</p>
      <span className="w-100 flex flex-row justify-between align-center">
        <small>{auth.user.name}</small>
        <i onClick={() => setUpdate(true)} className="fa-solid fa-pen-to-square"></i>
      </span>
    </div>
  );

  const otherFields = (
    <div className="flex flex-column justify-left align-start gap-1">
      {nameField}
      <div className="profileDetail">
        <p>{t("profile.username")}</p>
        <span>{auth.user.username}</span>
      </div>
      <div className="profileDetail">
        <p>{t("profile.email")}</p>
        <span>{auth.user.email}</span>
      </div>
    </div>
  );

  const userButtons = (
    <div className="userButton flex flex-row justify-between align-center gap-2 w-100 flex-wrap">
      <button type="button" onClick={() => setWantDelete((prev) => !prev)} className="delete">
        <span>{t("profile.delete")}</span>
      </button>

      <button type="submit" disabled={!update || input === ""} className="update">
        <span>{t("profile.update")}</span>
      </button>
    </div>
  );

  return (
    <>
      {wantDelete && (
        <>
          {deleteBox} <div className="opaBackground"></div>
        </>
      )}
      <section className="profile  flex flex-column justify-left align-start gap-3">
        <h1 className="headers">{t("profile.header")}</h1>
        {update ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdate();
            }}
            className="profileBox flex flex-row justify-left align-center gap-2 w-100 flex-wrap"
          >
            {userImage}
            {otherFields}
            {userButtons}
          </form>
        ) : (
          <div className="profileBox flex flex-row justify-left align-center gap-2 w-100 flex-wrap">
            {userImage}
            {otherFields}
            {userButtons}
          </div>
        )}

        <LineChart
          fontSize={breakpoint === "xl" ? 16 : breakpoint === "lg" ? 13 : breakpoint === "md" ? 8 : breakpoint === "sm" ? 7 : null}
          width={breakpoint === "xl" ? 850 : breakpoint === "lg" ? 700 : breakpoint === "md" ? 500 : breakpoint === "sm" ? 350 : null}
          height={breakpoint === "xl" ? 600 : breakpoint === "lg" ? 500 : breakpoint === "md" ? 400 : breakpoint === "sm" ? 300 : null}
          data={data}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, max]} /> <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="todos" stroke="#8884d8" />
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
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  deleteUser,
  updateUser,
  uploadImage,
})(Profile);
