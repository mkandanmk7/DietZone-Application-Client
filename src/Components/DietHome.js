import { useEffect, useContext } from "react";
import authaxios from "../Axios";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { PUTDATA, GETDATA } from "../Context/UserReducer";
import "./Diethome.css";
import { FaUserCog } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { InView } from "react-intersection-observer";
const DietHome = () => {
  const { userState, dispatch } = useContext(UserContext);
  console.log(userState);

  const history = useHistory();
  let date = new Date().toDateString();

  const updateWater = async (oper) => {
    try {
      let water;
      if (oper === "minus") {
        water = userState.water - 1;
      } else {
        water = userState.water + 1;
      }

      const { data } = await authaxios.put(
        `userInfo/calories/${userState._id}`,
        {
          water: water,
        },
        { headers: { authtoken: localStorage.getItem("authtoken") } }
      );
      dispatch({ type: PUTDATA, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  //to get user data
  let checkUserDetails = async () => {
    try {
      let date = new Date().toDateString();
      const { data } = await authaxios.get("/userInfo", {
        headers: { authtoken: localStorage.getItem("authtoken") },
      });

      if (!data) {
        history.push("/userdetails");
      } else if (date !== data.date) {
        updateDay(data);
      } else {
        dispatch({ type: GETDATA, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //to update everday calories in database
  let updateDay = async (data) => {
    let date = new Date().toDateString();
    let temptrack = [...data.track];
    let addprevday = {
      calories: data.calories,
      water: data.water,
      date: data.date,
      food: data.food,
    };
    temptrack.push(addprevday);
    const { data: updatedData } = await authaxios.put(
      `userInfo/calories/${data._id}`,
      {
        track: temptrack,
        calories: 0,
        date: date,
        food: [],
        water: 0,
      },
      { headers: { authtoken: localStorage.getItem("authtoken") } }
    );
    dispatch({ type: GETDATA, payload: updatedData });
  };

  useEffect(() => {
    if (userState.userId === undefined || date !== userState.date) {
      checkUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //to persist user details
  useEffect(() => {
    window.localStorage.setItem("userstate", JSON.stringify(userState));
  }, [userState]);

  return (
    <>
      <div className="container-fluid">
        <div className="welcome">
          <div className="circle welcircle">
            <p>Welcome</p>
            <div className="circle-float"></div>
          </div>
        </div>
        <InView threshold={0.5}>
          {({ ref, inView }) => (
            <div className="userdiv" ref={ref}>
              <div id="userdetails">
                <h1>
                  {userState.userName}{" "}
                  <Link className=" btn btn-outline-light" to="/UserInfo">
                    <FaUserCog />
                  </Link>
                </h1>
                <Link to="/track" className="btn btn-outline-light my-3">
                  Track
                </Link>
                <p>
                  <span>{userState.totalDays}</span> days challenge!!
                </p>
              </div>
              <div className="circle bg-light">
                <p id="circle-content">
                  {Math.round(userState.calories)}/{userState.caloriesNeed} kcal
                </p>
                <div
                  className={
                    inView ? "circle-float-blue" : "circle-float-blue-static"
                  }
                ></div>
              </div>
              <div className="dec"></div>
            </div>
          )}
        </InView>
        <InView threshold={0.6}>
          {({ ref, inView }) => (
            <div className="food water" ref={ref}>
              <div className="addfood">
                <p className="bold"> I drink water,just to surprise my liver</p>
                <div className="progress ">
                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${Math.trunc((userState.water / 8) * 100)}%`,
                    }}
                  >
                    {userState.water} glasses
                  </div>
                </div>
                <div>
                  <button
                    className="addandSubtract minus mx-4"
                    disabled={userState.water <= 0}
                    onClick={() => {
                      updateWater("minus");
                    }}
                  >
                    <AiFillMinusCircle />
                  </button>
                  <button
                    className="addandSubtract plus"
                    onClick={() => {
                      updateWater("plus");
                    }}
                  >
                    <AiFillPlusCircle />{" "}
                  </button>
                </div>
              </div>
              <div className="circle bg-danger">
                <p>{Math.trunc((userState.water / 8) * 100)} %</p>
                <div
                  className={inView ? "circle-float" : "circle-float-static"}
                ></div>
              </div>
            </div>
          )}
        </InView>
      </div>
    </>
  );
};

export default DietHome;
