import React, { useEffect, useState } from "react";
import { deletePlanCollection, updatePlanCollection, favoriteCollection } from "../../actions/plan";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress, CircularProgressLabel, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icons from "../Icons";
const PlanCollection = ({ icon, name, id, auth, deletePlanCollection, updatePlanCollection, favoriteCollection, plans, plan, fav }) => {
  const { t, i18n } = useTranslation();
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(name);
  const [theIcon, setTheIcon] = useState(icon);

  const allPlanNumber = plans.length;
  const completedPlanNumber = plans.filter((plan) => plan.done).length;

  useEffect(() => {
    setInput(name);
    setTheIcon(icon);
  }, [name, icon]);

  const onCollectionDelete = () => {
    deletePlanCollection(auth.user._id, id);
  };

  const onUpdate = async () => {
    await updatePlanCollection(auth.user._id, id, input, theIcon);
    setUpdate(false);
  };

  const text = update ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUpdate();
      }}
      className="updateCollectionForm flex flex-column justify-left align-start w-100 gap-1"
    >
      <input
        type="text"
        name="name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "13" && !e.shiftKey) {
            onUpdate();
          }
        }}
        autoFocus
      />
      <Icons setActiveIcon={setTheIcon} activeIcon={theIcon} />
      <div className="flex flex-row justify-between align-center w-100">
        <button disabled={plan.collectionLoading || input === ""} type="submit" className="updateCollection">
          {plan.collectionLoading ? <Spinner /> : t("update")}
        </button>

        <button
          onClick={() => {
            setUpdate((prev) => !prev);
            setInput(name);
          }}
          className="updateCollection"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  ) : (
    <Link to={`/plan/${id}`} className="collectionName">
      {name}
    </Link>
  );

  const operation = !update && (
    <div className="flex flex-row justify-between align-center w-100">
      <span onClick={onCollectionDelete}>
        <i className="fa-solid fa-trash"></i>
      </span>
      <span onClick={() => setUpdate(true)}>
        <i className="fa-solid fa-pen"></i>
      </span>
    </div>
  );

  return (
    <div className="collectionItem flex flex-column justify-left align-start w-100 position-relative gap-1 pointer">
      <div className="boxItemContent flex flex-column flex-wrap justify-center align-start w-100 gap-1">
        <div className="flex flex-row justify-between align-center w-100">
          <span>
            <i className={`fa-solid ${icon} cardIcon`}></i>
          </span>
          {fav ? (
            <span onClick={() => favoriteCollection(auth.user._id, id)}>
              <i className="fa-solid fa-star"></i>
            </span>
          ) : (
            <span onClick={() => favoriteCollection(auth.user._id, id)}>
              <i className="fa-regular fa-star"></i>
            </span>
          )}
        </div>

        <div className="flex flex-row justify-between align-center w-100">
          <div className="flex flex-column justify-between align-start w-100">
            {text}
            {!update && (
              <span className="doneNumber">
                <>
                  {completedPlanNumber === allPlanNumber && allPlanNumber !== 0 ? (
                    "All done"
                  ) : (
                    <>
                      {completedPlanNumber}/{allPlanNumber} {t("done")}
                    </>
                  )}
                </>
              </span>
            )}
          </div>
          {!update && (
            <CircularProgress
              className="pointer"
              size="30px"
              value={(completedPlanNumber / (allPlanNumber === 0 ? 1 : allPlanNumber)) * 100}
            />
          )}
        </div>
      </div>
      {operation}
    </div>
  );
};
PlanCollection.propTypes = {
  deletePlanCollection: PropTypes.func.isRequired,
  updatePlanCollection: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favoriteCollection: PropTypes.func.isRequired,
};

export default connect(null, {
  deletePlanCollection,
  updatePlanCollection,
  favoriteCollection,
})(PlanCollection);
