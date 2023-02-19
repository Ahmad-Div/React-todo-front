import React, { useEffect, useState } from "react";
import { deleteCollection, updateCollection, favoriteCollection } from "../../actions/todo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CircularProgress, CircularProgressLabel, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icons from "../Icons";
const TodoCollection = ({ icon, name, id, auth, deleteCollection, updateCollection, favoriteCollection, fav, todos, todo }) => {
  const { t, i18n } = useTranslation();
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(name);
  const [theIcon, setTheIcon] = useState(icon);

  const allTodoNumber = todos.length;
  const completedTodoNumber = todos.filter((todo) => todo.done).length;

  useEffect(() => {
    setInput(name);
    setTheIcon(icon);
  }, [name, icon]);

  const onCollectionDelete = () => {
    deleteCollection(auth.user._id, id);
  };

  const onUpdate = async () => {
    await updateCollection(auth.user._id, id, input, theIcon);
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
      <Icons activeIcon={theIcon} setActiveIcon={setTheIcon} />
      <div className="flex flex-row justify-between align-center w-100">
        <button disabled={todo.collectionLoading || input === ""} type="submit" className="updateCollection">
          {todo.collectionLoading ? <Spinner /> : t("update")}
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
    <Link to={`/todo/${id}`} className="collectionName">
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
                  {completedTodoNumber === allTodoNumber && allTodoNumber !== 0 ? (
                    "All done"
                  ) : (
                    <>
                      {completedTodoNumber}/{allTodoNumber} {t("done")}
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
              value={(completedTodoNumber / (allTodoNumber === 0 ? 1 : allTodoNumber)) * 100}
            />
          )}
        </div>
      </div>
      {operation}
    </div>
  );
};

TodoCollection.propTypes = {
  deleteCollection: PropTypes.func.isRequired,
  updateCollection: PropTypes.func.isRequired,
  favoriteCollection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteCollection,
  updateCollection,
  favoriteCollection,
})(TodoCollection);
