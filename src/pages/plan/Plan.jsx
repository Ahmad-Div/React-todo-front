import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import PlanItem from "../../component/plan/PlanItem";
import PlanCollection from "../../component/plan/PlanColllection";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getPlan, getPlanCollections, postPlanCollection, postPlan } from "../../actions/plan";
import store from "../../redux/store";
const Plan = ({ auth, plan, getPlanCollections, postPlanCollection, postPlan, getPlan }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState();
  const [{ planBox, collection }, setInputs] = useState({
    planBox: "",
    collection: "",
  });
  useEffect(() => {
    store.dispatch(loadUser());
    getPlanCollections();
    getPlan(collectionId);
  }, [collectionId]);

  if (!auth.isAuthenticated) {
    return navigate("/auth/login");
  }

  //post collection
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onPlanSubmit = () => {
    setInputs((prev) => ({ ...prev, planBox: "" }));
    postPlan(auth.user._id, collectionId, planBox);
  };

  const onCollectionSubmit = () => {
    setInputs((prev) => ({ ...prev, collection: "" }));
    postPlanCollection(auth.user._id, collection);
  };

  return (
    <section className="plan flex flex-column justify-left align-center w-100 gap-2">
      {collectionName !== "" ? (
        <h1 className="headers w-100">
          {collectionName} <small>{t("plan.collection")}</small>
        </h1>
      ) : (
        <small>{t("plan.noCollection")}</small>
      )}

      <div className="planAndCollection flex flex-row justify-center align-center gap-3 flex-wrap w-100">
        <div className="planCard flex flex-column justify-center align-center gap-1">
          <div className="upPlanCard">
            {moment(Date.now()).format("MMMM Do YYYY")} {moment(Date.now()).format("dddd")}
          </div>
          <div className="downPlanCard flex flex-column justify-left align-center ">
            {plan.plans?.map((plan, index) => {
              return <PlanItem done={plan.done} collectionId={collectionId} auth={auth} id={plan._id} key={index} content={plan.content} />;
            })}
          </div>
          <form
            className="planForm w-100"
            onSubmit={(e) => {
              e.preventDefault();
              onPlanSubmit();
            }}
          >
            <div className="newPlanInput flex flex-row justify-between align-center w-100">
              <input
                value={planBox}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "13" && !e.shiftKey) {
                    onPlanSubmit();
                  }
                }}
                placeholder={t("plan.planPlaceHolder")}
                type="text"
                name="planBox"
                id="plan"
              />
              <button disabled={plan.planLoading || planBox === ""} type="submit" className="addPlan">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="collectionCard flex flex-column justify-center align-center gap-1">
          <p className="upCollectionCard">{t("plan.collections")}</p>
          <div className="downCollectionCard  flex flex-column justify-left align-center">
            {plan.collections?.map((collection, index) => {
              return (
                <PlanCollection
                  selectedCollection={collectionName}
                  auth={auth}
                  id={collection._id}
                  setCollectionName={setCollectionName}
                  setCollectionId={setCollectionId}
                  key={index}
                  name={collection.name}
                />
              );
            })}
          </div>{" "}
          <form
            className="collectionForm w-100"
            onSubmit={(e) => {
              e.preventDefault();
              onCollectionSubmit();
            }}
          >
            <div className="newCollectionInput flex flex-row justify-between align-center w-100">
              <input
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "13" && !e.shiftKey) {
                    onCollectionSubmit();
                  }
                }}
                value={collection}
                placeholder={t("todo.collectionPlaceHolder")}
                type="text"
                name="collection"
                id="collection"
              />
              <button disabled={plan.collectionLoading || collection === ""} type="submit" className="addCollection">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>
        {plan.collectionErrors && (
          <small
            style={{
              textAlign: "center",
              fontSize: "12px",
            }}
            className="error"
          >
            {plan.collectionErrors}
          </small>
        )}

        {plan.planErrors && (
          <small
            style={{
              textAlign: "center",
              fontSize: "12px",
            }}
            className="error"
          >
            {plan.planErrors}
          </small>
        )}
      </div>
    </section>
  );
};

Plan.propTypes = {
  getPlanCollections: PropTypes.func.isRequired,
  postPlanCollection: PropTypes.func.isRequired,
  getPlan: PropTypes.func.isRequired,
  postPlan: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plan: state.plan,
});

export default connect(mapStateToProps, {
  getPlan,
  postPlan,
  getPlanCollections,
  postPlanCollection,
})(Plan);
