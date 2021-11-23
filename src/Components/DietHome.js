import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import authaxios from "../Axios";
import { UserContext } from "../Context/UserContext";
import { GETDATA } from "../Context/UserReducer";

const DietHome = () => {
  const { userState, dispatch } = useContext(UserContext);
  console.log(userState);

  const history = useHistory();
  let date = new Date().toDateString();

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

  return <div>home</div>;
};

export default DietHome;
