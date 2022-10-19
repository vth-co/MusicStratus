import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import SignupForm from "../SignupFormModal/SignupForm";
import "./SplashPage.css";

function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  if (user) {
    return <Redirect to="/discover" />;
  }

  return (
    <div className="splash-main">
      <div>
        <img
          className="background-img"
          src="../../../images/background.jpg"
          alt=""
        ></img>
        <button>
          <Link to={"/signup"}>
          <img className="grid-img" src="../../../images/5grid.jpg">
          </img>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default SplashPage;
