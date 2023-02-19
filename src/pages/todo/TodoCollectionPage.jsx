import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTodo, postTodo, getCollections, deleteAllTodo } from "../../actions/todo";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useParams } from "react-router-dom";
import TodoItem from "../../component/todo/TodoItem";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Icons from "../../component/Icons";
const TodoCollectionPage = ({ auth, todo, getTodo, getCollections, postTodo, deleteAllTodo }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState("all");
  const [showDelete, setShowDelete] = useState(false);
  const [activeIcon, setActiveIcon] = useState("fa-house");

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
    getCollections(auth.user._id);
    getTodo(auth.user._id, id);
  }, [id, auth]);

  const onTodoSubmit = async (e) => {
    postTodo(auth.user._id, id, input, activeIcon);
    setInput("");
  };

  return (
    <>
      {open && <div className="opaBackground"></div>}

      <section className="singleCollection flex flex-column justify-left align-start w-100 gap-2">
        <Link to="/todo">
          {i18n.language === "en" ? <i className="fa-solid fa-square-caret-left"></i> : <i className="fa-solid fa-square-caret-right"></i>}
        </Link>
        <div className="todoHeader flex flex-row justify-between align-center justify-center w-100 position-relative">
          <h1 className="headers w-100">
            {todo.collections.find((collection) => collection._id === id)?.name} &nbsp;
            {t("todo.collection")}
            <small>
              {moment(Date.now()).format("MMMM Do YYYY")} {moment(Date.now()).format("dddd")}
            </small>
          </h1>
          <span onClick={() => setShowDelete((prev) => !prev)}>
            <i className="fa-solid fa-ellipsis"></i>
          </span>
          {showDelete && (
            <div
              onClick={() => {
                setShowDelete(false);
                deleteAllTodo(auth.user._id, id);
              }}
              style={i18n.language === "en" ? { right: "0" } : { left: "0" }}
              className="deleteAllBox"
            >
              <small>{t("deleteAllTodos")}</small>
            </div>
          )}
        </div>

        <div
          className={
            i18n.language === "en"
              ? "favAndAllCollectionButton flex flex-row justify-left align-center gap-1 flex-wrap"
              : "favAndAllCollectionButton flex flex-row justify-right align-center gap-1 flex-wrap"
          }
        >
          {" "}
          <button onClick={() => setFav("all")} className={fav === "all" ? "fav activeSection" : "fav"}>
            {t("filter.allTodo")}
          </button>
          <button onClick={() => setFav("done")} className={fav === "done" ? "fav activeSection" : "fav"}>
            {t("filter.done")}
          </button>
          <button onClick={() => setFav("remain")} className={fav === "remain" ? "fav activeSection" : "fav"}>
            {t("filter.remain")}
          </button>
        </div>

        <div
          className={
            i18n.language === "en"
              ? "todoCards flex flex-row justify-left align-start flex-wrap gap-1 w-100"
              : "todoCards flex flex-row justify-right align-start flex-wrap gap-1 w-100"
          }
        >
          {" "}
          <div onClick={() => setOpen(true)} className="openCollectionForm flex flex-row justify-center align-center">
            <i className="fa-solid fa-plus"></i>
          </div>
          {todo.fetchTodoLoading ? (
            <div className="w-100 flex flex-row justify-center align-center">
              <Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </div>
          ) : (
            <>
              {fav === "done" ? (
                <>
                  {todo.todos?.map((item, index) => {
                    return (
                      item.done && (
                        <TodoItem
                          todo={todo}
                          done={item.done}
                          collectionId={id}
                          icon={item.icon}
                          auth={auth}
                          id={item._id}
                          key={index}
                          content={item.content}
                        />
                      )
                    );
                  })}
                </>
              ) : fav === "remain" ? (
                <>
                  {todo.todos?.map((item, index) => {
                    return (
                      !item.done && (
                        <TodoItem
                          todo={todo}
                          done={item.done}
                          icon={item.icon}
                          collectionId={id}
                          auth={auth}
                          id={item._id}
                          key={index}
                          content={item.content}
                        />
                      )
                    );
                  })}
                </>
              ) : (
                <>
                  {todo.todos?.map((item, index) => {
                    return (
                      <TodoItem
                        todo={todo}
                        done={item.done}
                        icon={item.icon}
                        collectionId={id}
                        auth={auth}
                        id={item._id}
                        key={index}
                        content={item.content}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
          {open && (
            <form
              className="collectionForm flex flex-column gap-1"
              onSubmit={(e) => {
                e.preventDefault();
                onTodoSubmit();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
              <Icons setActiveIcon={setActiveIcon} activeIcon={activeIcon} />

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

              <div className="flex flex-row justify-between align-center w-100">
                <button disabled={todo.todoLoading} type="submit" className="addCollection">
                  {todo.todoLoading ? <Spinner /> : t("add")}
                </button>
                <button onClick={() => setOpen(false)} type="button" className="addCollection">
                  {t("cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

TodoCollectionPage.propTypes = {
  getTodo: PropTypes.func.isRequired,
  postTodo: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  deleteAllTodo: PropTypes.func.isRequired,
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
  deleteAllTodo,
})(TodoCollectionPage);
