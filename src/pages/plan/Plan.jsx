import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PlanCollection from "../../component/plan/PlanColllection";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getPlanCollections, postPlanCollection, deleteAllPlanCollection } from "../../actions/plan";
import { Spinner } from "@chakra-ui/react";
import store from "../../redux/store";
import Icons from "../../component/Icons";
const Plan = ({ auth, plan, getPlanCollections, postPlanCollection, deleteAllPlanCollection }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [collection, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState("all");
  const [showDelete, setShowDelete] = useState(false);
  const [activeIcon, setActiveIcon] = useState("fa-house");

  useEffect(() => {
    getPlanCollections(auth.user._id);
    if (!auth.isAuthenticated) {
      return navigate("/auth");
    }
  }, [auth]);
  //post collection

  const onCollectionSubmit = () => {
    setInput("");
    postPlanCollection(auth.user._id, collection, activeIcon);
  };

  return (
    <>
      {open && <div className="opaBackground"></div>}

      <section className="plan flex flex-column justify-left align-start w-100 gap-2">
        <div className="planHeader flex flex-row justify-between align-center justify-center w-100 position-relative">
          <h1 className="headers w-100">
            {t("plan.collections")}
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
                deleteAllPlanCollection(auth.user._id);
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
          {" "}
          <div onClick={() => setOpen(true)} className="openCollectionForm flex flex-row justify-center align-center">
            <i className="fa-solid fa-plus"></i>
          </div>
          {plan.fetchCollectionLoading ? (
            <div className="w-100 flex flex-row justify-center align-center">
              <Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </div>
          ) : (
            <>
              {fav === "fav" ? (
                <>
                  {plan.collections?.map((collection, index) => {
                    return (
                      collection.isFav && (
                        <PlanCollection
                          auth={auth}
                          plans={collection.plans}
                          id={collection._id}
                          icon={collection.icon}
                          key={index}
                          fav={collection.isFav}
                          name={collection.name}
                          plan={plan}
                        />
                      )
                    );
                  })}
                </>
              ) : fav === "done" ? (
                <>
                  {plan.collections?.map((collection, index) => {
                    return collection.plans.length === collection.plans.filter((plan) => plan.done).length &&
                      collection.plans.length !== 0 ? (
                      <PlanCollection
                        auth={auth}
                        id={collection._id}
                        icon={collection.icon}
                        plans={collection.plans}
                        key={index}
                        fav={collection.isFav}
                        name={collection.name}
                        plan={plan}
                      />
                    ) : null;
                  })}
                </>
              ) : fav === "remain" ? (
                <>
                  {plan.collections?.map((collection, index) => {
                    return collection.plans.length > collection.plans.filter((plan) => plan.done).length ||
                      collection.plans.length === 0 ? (
                      <PlanCollection
                        auth={auth}
                        plans={collection.plans}
                        id={collection._id}
                        key={index}
                        icon={collection.icon}
                        fav={collection.isFav}
                        name={collection.name}
                        plan={plan}
                      />
                    ) : null;
                  })}
                </>
              ) : (
                <>
                  {plan.collections?.map((collection, index) => {
                    return (
                      <PlanCollection
                        auth={auth}
                        plans={collection.plans}
                        id={collection._id}
                        key={index}
                        icon={collection.icon}
                        fav={collection.isFav}
                        name={collection.name}
                        plan={plan}
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
              {plan.collectionErrors && (
                <small
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                  className="error"
                >
                  {plan.collectionErrors}
                </small>
              )}
              <div className="flex flex-row justify-between align-center w-100">
                <button disabled={plan.collectionLoading} type="submit" className="addCollection">
                  {plan.collectionLoading ? <Spinner /> : t("add")}
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

Plan.propTypes = {
  getPlanCollections: PropTypes.func.isRequired,
  postPlanCollection: PropTypes.func.isRequired,
  deleteAllPlanCollection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plan: state.plan,
});

export default connect(mapStateToProps, {
  getPlanCollections,
  postPlanCollection,
  deleteAllPlanCollection,
})(Plan);
