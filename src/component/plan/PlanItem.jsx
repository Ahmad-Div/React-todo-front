import React, { useEffect, useState } from "react";
import { updatePlan, deletePlan, donePlan } from "../../actions/plan";
import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Icons from "../Icons";
const PlanItem = ({ icon, done, auth, collectionId, content, id, deletePlan, updatePlan, donePlan, plan }) => {
  const { t, i18n } = useTranslation();
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(content);
  const [theIcon, setTheIcon] = useState(icon);

  const oldPlan = content;

  useEffect(() => {
    setInput(content);
    setTheIcon(icon);
  }, [content, icon]);

  const onPlanDelete = () => {
    deletePlan(auth.user._id, collectionId, id);
  };

  const onUpdate = async () => {
    await updatePlan(auth.user._id, collectionId, { planItem: input, oldPlan: oldPlan, icon: theIcon });
    setUpdate(false);
  };

  const onDonePlan = () => {
    donePlan(auth.user._id, collectionId, id);
  };

  //if the todo is done so line through

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
      <Icons activeIcon={theIcon} setActiveIcon={setTheIcon} />
      <div className="flex flex-row justify-between align-center w-100">
        <button type="submit" className="updateCollection">
          {plan.planLoading ? <Spinner /> : t("update")}
        </button>

        <button
          onClick={() => {
            setUpdate(false);
            setInput(content);
          }}
          className="updateCollection"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  ) : (
    <p className={done ? "donePlan" : ""}>{content}</p>
  );

  const operation = !update && (
    <div className="flex flex-row justify-between align-center w-100">
      <span onClick={onPlanDelete}>
        <i className="fa-solid fa-trash"></i>
      </span>
      <span onClick={() => setUpdate(true)}>
        <i className="fa-solid fa-pen"></i>
      </span>
    </div>
  );

  return (
    <div className="planItem flex flex-column justify-left align-start w-100 position-relative gap-1 pointer">
      <div className="boxItemContent flex flex-column flex-wrap justify-between align-start w-100">
        <div className="flex flex-row justify-between align-center w-100">
          <span>
            <i className={`fa-solid ${icon} cardIcon`}></i>
          </span>
        </div>

        <div className="flex flex-row justify-between align-center w-100">
          {text}
          {!update && (
            <>
              {done ? (
                <i onClick={onDonePlan} className="fa-solid fa-circle-check"></i>
              ) : (
                <i onClick={onDonePlan} className="fa-regular fa-circle-check"></i>
              )}
            </>
          )}
        </div>
      </div>
      {operation}
    </div>
  );
};

PlanItem.propTypes = {
  deletePlan: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  donePlan: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plan: PropTypes.object.isRequired,
};

export default connect(null, {
  deletePlan,
  updatePlan,
  donePlan,
})(PlanItem);
