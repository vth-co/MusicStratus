import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import SignupForm from "../SignupFormModal/SignupForm";
import "./SplashPage.css";
import SimpleImageSlider from "react-simple-image-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  if (user) {
    return <Redirect to="/discover" />;
  }

  return (
    <div>
      <img
        className="background-img"
        src="../../../images/background1.jpg"
        alt="Clouds Background"
      ></img>
      {/* <div className="img-slider">
        <SimpleImageSlider
          width={896}
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div> */}
        <div className="carousel-container">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div>
              <img src="../../../images/background.jpg" />
            </div>
            <div></div>
          </Carousel>
      </div>
      {/* <button>
          <Link to={"/signup"}>
          <img className="grid-img" src="../../../images/5grid.jpg">
          </img>
          </Link>
        </button> */}
    </div>
  );
}

export default SplashPage;
