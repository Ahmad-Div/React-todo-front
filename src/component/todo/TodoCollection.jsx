import React, { useEffect, useState } from "react";
import { deleteCollection, updateCollection } from "../../actions/todo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const TodoCollection = ({ name, setCollectionName, id, auth, deleteCollection, updateCollection, setCollectionId, selectedCollection }) => {
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(name);

  useEffect(() => {
    setInput(name);
  }, [name]);
  const onCollectionDelete = () => {
    deleteCollection(auth.user._id, id);
  };
  let className = `collectionItem flex flex-row justify-between align-center w-100`;

  if (selectedCollection === name) {
    className = `collectionItem flex flex-row justify-between align-center w-100 activeCollection`;
  }

  const onUpdate = async () => {
    await updateCollection(auth.user._id, id, input);
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

TodoCollection.propTypes = {
  deleteCollection: PropTypes.func.isRequired,
  updateCollection: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteCollection,
  updateCollection,
})(TodoCollection);
