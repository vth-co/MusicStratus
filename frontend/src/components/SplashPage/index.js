import "./SplashPage.css";

function SplashPage() {
  return (
    <div className="splash-main">
      <div>
        <img
          className="background-img"
          src="../../../images/background.jpg"
          alt=""
        ></img>
      </div>
      <div className="image-container">
          <h2>Your own personal audio player</h2>
        <img
          className="player-img"
          src="../../../images/player.png"
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default SplashPage;
