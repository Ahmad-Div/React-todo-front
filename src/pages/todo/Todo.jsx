import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TodoItem from "../../component/todo/TodoItem";
import TodoCollection from "../../component/todo/TodoCollection";
import store from "../../redux/store";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getTodo, getCollections, postCollection, postTodo } from "../../actions/todo";
const Todo = ({ auth, getCollections, getTodo, todo, postCollection, postTodo }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState();
  const [{ todoBox, collection }, setInputs] = useState({
    todoBox: "",
    collection: "",
  });
  useEffect(() => {
    store.dispatch(loadUser());
    getCollections();
    getTodo(collectionId);
  }, [collectionId]);

  if (!auth.isAuthenticated) {
    return navigate("/auth/login");
  }

  //post collection
  const onChange = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onTodoSubmit = () => {
    setInputs((prev) => ({ ...prev, todoBox: "" }));
    postTodo(auth.user._id, collectionId, todoBox);
  };

  const onCollectionSubmit = () => {
    setInputs((prev) => ({ ...prev, collection: "" }));
    postCollection(auth.user._id, collection);
  };

  return (
    <section className="todo flex flex-column justify-left align-center w-100 gap-2">
      {collectionName !== "" ? (
        <h1 className="headers w-100">
          {collectionName} <small>{t("todo.collection")}</small>
        </h1>
      ) : (
        <small>{t("todo.noCollection")}</small>
      )}

      <div className="todoAndCollection flex flex-row justify-center align-center gap-3 flex-wrap w-100">
        <div className="todoCard flex flex-column justify-center align-center gap-1">
          <div className="upTodoCard">
            {moment(Date.now()).format("MMMM Do YYYY")} {moment(Date.now()).format("dddd")}
          </div>
          <div className="downTodoCard flex flex-column justify-left align-center">
            {todo.todos?.map((todo, index) => {
              return <TodoItem done={todo.done} collectionId={collectionId} auth={auth} id={todo._id} key={index} content={todo.content} />;
            })}
          </div>
          <form
            className="todoForm w-100"
            onSubmit={(e) => {
              e.preventDefault();
              onTodoSubmit();
            }}
          >
            <div className="newTodoInput flex flex-row justify-between align-center w-100">
              <input
                value={todoBox}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "13" && !e.shiftKey) {
                    onTodoSubmit();
                  }
                }}
                placeholder={t("todo.todoPlaceHolder")}
                type="text"
                name="todoBox"
                id="todo"
              />
              <button disabled={todo.todoLoading || todoBox === ""} type="submit" className="addTodo">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="collectionCard flex flex-column justify-center align-center gap-1">
          <p className="upCollectionCard">{t("todo.collections")}</p>
          <div className="downCollectionCard  flex flex-column justify-left align-center">
            {todo.collections?.map((collection, index) => {
              return (
                <TodoCollection
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
          </div>
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
              <button disabled={todo.collectionLoading || collection === ""} type="submit" className="addCollection">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>
        {todo.collectionErrors && (
          <small
            style={{
              textAlign: "center",
              fontSize: "12px",
            }}
            className="error"
          >
            {todo.collectionErrors}
          </small>
        )}

        {todo.todoErrors && (
          <small
            style={{
              textAlign: "center",
              fontSize: "12px",
            }}
            className="error"
          >
            {todo.todoErrors}
          </small>
        )}
      </div>
    </section>
  );
};

Todo.propTypes = {
  getCollections: PropTypes.func.isRequired,
  postCollection: PropTypes.func.isRequired,
  getTodo: PropTypes.func.isRequired,
  postTodo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  todo: state.todo,
});
export default connect(mapStateToProps, {
  getTodo,
  postTodo,
  getCollections,
  postCollection,
})(Todo);
