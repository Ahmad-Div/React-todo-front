import React, { useEffect, useState } from "react";
import { deletePlanCollection, updatePlanCollection } from "../../actions/plan";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const PlanCollection = ({
  name,
  setCollectionName,
  id,
  auth,
  deletePlanCollection,
  updatePlanCollection,
  setCollectionId,
  selectedCollection,
}) => {
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(name);
  const onCollectionDelete = () => {
    deletePlanCollection(auth.user._id, id);
  };
  let className = `collectionItem flex flex-row justify-between align-center w-100`;

  if (selectedCollection === name) {
    className = `collectionItem flex flex-row justify-between align-center w-100 activeCollection`;
  }

  const onUpdate = async () => {
    await updatePlanCollection(auth.user._id, id, input);
    setUpdate((prev) => !prev);
  };

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
      <button type="submit" className="addCollection">
        <i className="fa-solid fa-circle-check"></i>
      </button>
    </form>
  ) : (
    <p
      onClick={() => {
        setCollectionName(name);
        setCollectionId(id);
      }}
      className="collectionName"
    >
      {name}
    </p>
  );

  const operation = update ? (
    <span
      onClick={() => {
        setUpdate((prev) => !prev);
        setInput(name);
      }}
    >
      <i className="fa-solid fa-xmark"></i>
    </span>
  ) : (
    <div className="flex flex-row justify-center align-center gap-1">
      <span onClick={onCollectionDelete}>
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
PlanCollection.propTypes = {
  deletePlanCollection: PropTypes.func.isRequired,
  updatePlanCollection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(null, {
  deletePlanCollection,
  updatePlanCollection,
})(PlanCollection);
