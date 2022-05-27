import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {

  const user = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

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
       <img className="grid-img" 
       src="../../../images/5grid.jpg"></img>
      </div>
    </div>
  );
}

export default SplashPage;
