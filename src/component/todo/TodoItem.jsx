import React, { useEffect, useState } from "react";
import { deleteTodo, updateTodo, doneTodo } from "../../actions/todo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const TodoItem = ({ done, auth, collectionId, content, id, deleteTodo, updateTodo, doneTodo }) => {
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState(content);
  const oldTodo = content;

  useEffect(() => {
    setInput(content);
  }, [content]);

  const onTodoDelete = () => {
    deleteTodo(auth.user._id, collectionId, id);
  };

  const onUpdate = async () => {
    await updateTodo(auth.user._id, collectionId, { todoItem: input, oldTodo: oldTodo });
    setUpdate((prev) => !prev);
  };

  const onDoneTodo = () => {
    doneTodo(auth.user._id, collectionId, id);
  };

  //if the todo is done so line through

  let className;
  if (done) {
    className = `todoItem flex flex-row justify-between align-center w-100 doneTodo`;
  } else {
    className = `todoItem flex flex-row justify-between align-center w-100`;
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
    <p className="todoTask">{content}</p>
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
      <span onClick={onDoneTodo}>
        <i className="fa-solid fa-circle-check"></i>
      </span>
      <span onClick={onTodoDelete}>
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

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  doneTodo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteTodo,
  updateTodo,
  doneTodo,
})(TodoItem);
