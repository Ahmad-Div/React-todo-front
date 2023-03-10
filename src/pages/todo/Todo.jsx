import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TodoItem from "../../component/todo/TodoItem";
import TodoCollection from "../../component/todo/TodoCollection";
import { Spinner } from "@chakra-ui/react";
import store from "../../redux/store";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCollections, postCollection, deleteAllCollection } from "../../actions/todo";
import Icons from "../../component/Icons";
const Todo = ({ auth, getCollections, todo, deleteAllCollection, postCollection }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState("all");
  const [collection, setInput] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [activeIcon, setActiveIcon] = useState("fa-house");
  useEffect(() => {
    getCollections(auth.user._id);
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
  }, [auth]);

  const onCollectionSubmit = () => {
    postCollection(auth.user._id, { collection: collection, icon: activeIcon });
    setInput("");
  };

  return (
    <>
      {open && <div className="opaBackground"></div>}
      <section className="todo flex flex-column justify-left align-start w-100 gap-2 position-relative">
        <div className="todoHeader flex flex-row justify-between align-center justify-center w-100 position-relative">
          <h1 className="headers w-100">
            {t("todo.collections")}
            <small>
              {" "}
              {moment(Date.now()).format("MMMM Do YYYY")} {moment(Date.now()).format("dddd")}
            </small>
          </h1>
          <span onClick={() => setShowDelete((prev) => !prev)}>
            <i className="fa-solid fa-ellipsis"></i>
          </span>
          {showDelete && (
            <div
              onClick={() => {
                deleteAllCollection(auth.user._id);
                setShowDelete(false);
              }}
              style={i18n.language === "en" ? { right: "0" } : { left: "0" }}
              className="deleteAllBox"
            >
              <small>{t("deleteAllCollection")}</small>
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
            {t("filter.all")}
          </button>
          <button onClick={() => setFav("fav")} className={fav === "fav" ? "fav activeSection" : "fav"}>
            {t("filter.fav")}
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
              ? "collectionCards flex flex-row justify-left align-start flex-wrap gap-1 w-100"
              : "collectionCards flex flex-row justify-right align-start flex-wrap gap-1 w-100"
          }
        >
          <div onClick={() => setOpen(true)} className="openCollectionForm flex flex-row justify-center align-center">
            <i className="fa-solid fa-plus"></i>
          </div>
          {todo.fetchCollectionLoading ? (
            <div className="w-100 flex flex-row justify-center align-center">
              <Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </div>
          ) : (
            <>
              {fav === "fav" ? (
                <>
                  {" "}
                  {todo.collections?.map((collection, index) => {
                    return (
                      collection.isFav && (
                        <TodoCollection
                          auth={auth}
                          todos={collection.todos}
                          id={collection._id}
                          key={index}
                          icon={collection.icon}
                          fav={collection.isFav}
                          name={collection.name}
                          todo={todo}
                        />
                      )
                    );
                  })}
                </>
              ) : fav === "done" ? (
                <>
                  {todo.collections?.map((collection, index) => {
                    return collection.todos.length === collection.todos.filter((todo) => todo.done).length &&
                      collection.todos.length !== 0 ? (
                      <TodoCollection
                        auth={auth}
                        id={collection._id}
                        todos={collection.todos}
                        key={index}
                        icon={collection.icon}
                        fav={collection.isFav}
                        name={collection.name}
                        todo={todo}
                      />
                    ) : null;
                  })}
                </>
              ) : fav === "remain" ? (
                <>
                  {todo.collections?.map((collection, index) => {
                    return collection.todos.length > collection.todos.filter((todo) => todo.done).length ||
                      collection.todos.length === 0 ? (
                      <TodoCollection
                        auth={auth}
                        id={collection._id}
                        todos={collection.todos}
                        key={index}
                        icon={collection.icon}
                        fav={collection.isFav}
                        name={collection.name}
                        todo={todo}
                      />
                    ) : null;
                  })}
                </>
              ) : (
                <>
                  {todo.collections?.map((collection, index) => {
                    return (
                      <TodoCollection
                        auth={auth}
                        id={collection._id}
                        icon={collection.icon}
                        todos={collection.todos}
                        key={index}
                        fav={collection.isFav}
                        name={collection.name}
                        todo={todo}
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
                onCollectionSubmit();
              }}
            >
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "13" && !e.shiftKey) {
                    onCollectionSubmit();
                  }
                }}
                autoFocus
                value={collection}
                placeholder={t("todo.collectionPlaceHolder")}
                type="text"
                name="collection"
                id="collection"
              />
              <Icons setActiveIcon={setActiveIcon} activeIcon={activeIcon} />
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
              <div className="flex flex-row justify-between align-center w-100">
                <button disabled={todo.collectionLoading} type="submit" className="addCollection">
                  {todo.collectionLoading ? <Spinner /> : t("add")}
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

Todo.propTypes = {
  getCollections: PropTypes.func.isRequired,
  postCollection: PropTypes.func.isRequired,
  deleteAllCollection: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  todo: state.todo,
});
export default connect(mapStateToProps, {
  getCollections,
  deleteAllCollection,
  postCollection,
})(Todo);
