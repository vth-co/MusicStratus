import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import SignupForm from "../SignupFormModal/SignupForm";
import "./SplashPage.css";
import SimpleImageSlider from "react-simple-image-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LoginFormModal from "../LoginPage";

function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  // if (user) {
  //   return <Redirect to="/discover" />;
  // }

  return (
    <div>
        <div className="carousel-container">
          <div className="centering">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            // autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div className="carousel-div">
              <h2 className="carousel-text">Discover</h2>
              <img src="../../../images/carousel2.jpg" />
            </div>
            <div className="carousel-div">
              <h2 className="carousel-text">Share </h2>
              <div>
                
              </div>
              <img src="../../../images/carousel3.jpg" />
            </div>
            {/* <div className="carousel-div">
              <img src="../../../images/carousel.jpg" />
            </div> */}
          </Carousel>
          </div>
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
