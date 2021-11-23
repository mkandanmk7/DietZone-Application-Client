import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Verify.css";
import authaxios from "../Axios";

function Verifyuser() {
  const params = useParams();
  const history = useHistory();
  const [data, Setdata] = useState({});

  let verify = async () => {
    try {
      const { data } = await authaxios.put(`/users/verifyUser/${params.id}`);
      console.log(data);
      Setdata(data);
      if (data.success) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data.success ? (
        <div className="verifymes">
          <p>User verification success</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Verifyuser;
