import React, { useEffect, useState } from "react";
import { deletePlan, updatePlan, donePlan } from "../../actions/plan";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const PlanItem = ({ done, auth, collectionId, content, id, deletePlan, updatePlan, donePlan }) => {
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(content);
  const oldPlan = content;

  useEffect(() => {
    setInput(content);
  }, [content]);

  const onPlanDelete = () => {
    deletePlan(auth.user._id, collectionId, id);
  };

  const onUpdate = async () => {
    await updatePlan(auth.user._id, collectionId, { planItem: input, oldPlan: oldPlan });
    setUpdate((prev) => !prev);
  };

  const onDonePlan = () => {
    donePlan(auth.user._id, collectionId, id);
  };

  //if the todo is done so line through

  let className;
  if (done) {
    className = `planItem flex flex-row justify-between align-center w-100 donePlan`;
  } else {
    className = `planItem flex flex-row justify-between align-center w-100`;
  }

  const text = update ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onUpdate();
      }}
      className="flex flex-row justify-left align-center gap-1"
    >
      <input
        type="text"
        className="w-100"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "13" && !e.shiftKey) {
            onUpdate();
          }
        }}
      />{" "}
      <button disabled={input === ""} type="submit" className="doneTodo">
        <i className="fa-solid fa-circle-check"></i>
      </button>
    </form>
  ) : (
    <p className="planTask">{content}</p>
  );

  const operation = update ? (
    <span
      onClick={() => {
        setInput(content);
        setUpdate((prev) => !prev);
      }}
    >
      <i className="fa-solid fa-xmark"></i>
    </span>
  ) : (
    <div className="flex flex-row justify-center align-center gap-1">
      <span onClick={onDonePlan}>
        <i className="fa-solid fa-circle-check"></i>
      </span>
      <span onClick={onPlanDelete}>
        <i className="fa-solid fa-trash"></i>
      </span>
      <span onClick={() => setUpdate((prev) => !prev)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </span>
    </div>
  );

  return (
    <div className={className}>
      {text} {operation}
    </div>
  );
};

PlanItem.propTypes = {
  deletePlan: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  donePlan: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(null, {
  deletePlan,
  updatePlan,
  donePlan,
})(PlanItem);
