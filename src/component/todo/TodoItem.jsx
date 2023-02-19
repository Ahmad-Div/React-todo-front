import React, { useEffect, useState } from "react";
import { deleteTodo, updateTodo, doneTodo } from "../../actions/todo";
import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Icons from "../Icons";
const TodoItem = ({ done, auth, collectionId, content, id, deleteTodo, updateTodo, doneTodo, todo, icon }) => {
  const { t, i18n } = useTranslation();
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(content);
  const [theIcon, setTheIcon] = useState(icon);

  const oldTodo = content;

  useEffect(() => {
    setTheIcon(icon);
    setInput(content);
  }, [content, icon]);

  const onTodoDelete = () => {
    deleteTodo(auth.user._id, collectionId, id);
  };

  const onUpdate = async () => {
    await updateTodo(auth.user._id, collectionId, { todoItem: input, oldTodo: oldTodo, icon: theIcon });
    setUpdate(false);
  };

  const onDoneTodo = () => {
    doneTodo(auth.user._id, collectionId, id);
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
          {todo.todoLoading ? <Spinner /> : t("update")}
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
    <p className={done ? "doneTodo" : ""}>{content}</p>
  );

  const operation = !update && (
    <div className="flex flex-row justify-between align-center w-100">
      <span onClick={onTodoDelete}>
        <i className="fa-solid fa-trash"></i>
      </span>
      <span onClick={() => setUpdate(true)}>
        <i className="fa-solid fa-pen"></i>
      </span>
    </div>
  );

  return (
    <div className="todoItem flex flex-column justify-left align-start w-100 position-relative gap-1 pointer">
      <div className="boxItemContent flex flex-column flex-wrap justify-center gap-1 align-start w-100">
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
                <i onClick={onDoneTodo} className="fa-solid fa-circle-check"></i>
              ) : (
                <i onClick={onDoneTodo} className="fa-regular fa-circle-check"></i>
              )}
            </>
          )}
        </div>
      </div>
      {operation}
    </div>
  );
};

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  doneTodo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteTodo,
  updateTodo,
  doneTodo,
})(TodoItem);
