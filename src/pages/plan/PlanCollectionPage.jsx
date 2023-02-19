import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPlan, postPlan, getPlanCollections, deleteAllPlan } from "../../actions/plan";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PlanItem from "../../component/plan/PlanItem";
import Icons from "../../component/Icons";
const PlanCollectionPage = ({ auth, plan, getPlan, getPlanCollections, postPlan, deleteAllPlan }) => {
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
    getPlanCollections(auth.user._id);
    getPlan(auth.user._id, id);
  }, [id, auth]);

  const onPlanSubmit = async (e) => {
    postPlan(auth.user._id, id, input, activeIcon);
    setInput("");
  };

  return (
    <>
      {open && <div className="opaBackground"></div>}

      <section className="singleCollection flex flex-column justify-left align-start w-100 gap-2">
        <Link to="/plan">
          {i18n.language === "en" ? <i className="fa-solid fa-square-caret-left"></i> : <i className="fa-solid fa-square-caret-right"></i>}
        </Link>
        <div className="planHeader flex flex-row justify-between align-center justify-center w-100 position-relative">
          <h1 className="headers w-100">
            {plan.collections.find((collection) => collection._id === id)?.name} &nbsp;
            {t("plan.collection")}
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
                deleteAllPlan(auth.user._id, id);
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
              ? "planCards flex flex-row justify-left align-start flex-wrap gap-1 w-100"
              : "planCards flex flex-row justify-right align-start flex-wrap gap-1 w-100"
          }
        >
          {" "}
          <div onClick={() => setOpen(true)} className="openCollectionForm flex flex-row justify-center align-center">
            <i className="fa-solid fa-plus"></i>
          </div>
          {plan.fetchPlanLoading ? (
            <div className="w-100 flex flex-row justify-center align-center">
              <Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </div>
          ) : (
            <>
              {fav === "done" ? (
                <>
                  {plan.plans?.map((item, index) => {
                    return (
                      item.done && (
                        <PlanItem
                          plan={plan}
                          done={item.done}
                          collectionId={id}
                          auth={auth}
                          id={item._id}
                          icon={item.icon}
                          key={index}
                          content={item.content}
                        />
                      )
                    );
                  })}
                </>
              ) : fav === "remain" ? (
                <>
                  {plan.plans?.map((item, index) => {
                    return (
                      !item.done && (
                        <PlanItem
                          icon={item.icon}
                          plan={plan}
                          done={item.done}
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
                  {plan.plans?.map((item, index) => {
                    return (
                      <PlanItem
                        plan={plan}
                        icon={item.icon}
                        done={item.done}
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
                onPlanSubmit();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "13" && !e.shiftKey) {
                    onPlanSubmit();
                  }
                }}
                placeholder={t("plan.planPlaceHolder")}
                type="text"
                name="planBox"
                id="plan"
              />
              <Icons setActiveIcon={setActiveIcon} activeIcon={activeIcon} />

              {plan.planErrors && (
                <small
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                  className="error"
                >
                  {plan.planErrors}
                </small>
              )}

              <div className="flex flex-row justify-between align-center w-100">
                <button disabled={plan.planLoading} type="submit" className="addCollection">
                  {plan.planLoading ? <Spinner /> : t("add")}
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

PlanCollectionPage.propTypes = {
  getPlan: PropTypes.func.isRequired,
  postPlan: PropTypes.func.isRequired,
  getPlanCollections: PropTypes.func.isRequired,
  deleteAllPlan: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plan: state.plan,
});

export default connect(mapStateToProps, {
  getPlan,
  postPlan,
  getPlanCollections,
  deleteAllPlan,
})(PlanCollectionPage);
