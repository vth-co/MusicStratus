import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {

  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Redirect to="/user" />;
  }


  return (
    <div className="splash-main">
      <div>
        <img
          className="background-img"
          src="../../../images/background.jpg"
          alt=""
        ></img>
      </div>
      <div>
        <img></img>
        <img></img>
        <img></img>
        <img></img>
      </div>
    </div>
  );
}

export default SplashPage;
