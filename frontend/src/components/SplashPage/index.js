import { useSelector } from "react-redux";
import "./SplashPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function SplashPage() {
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  return (
    <div>
        <div className="carousel-container">
          <div className="centering">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div className="carousel-div">
              <h2 className="carousel-title">Discover new music</h2>
              <p className="carousel-text">Listen on the go, ad-free, with a lot of tracks and growing.</p>
              <img src="../../../images/carousel2.jpg" />
            </div>
            <div className="carousel-div">
              <h2 className="carousel-title">Share your creativity</h2>
              <p className="carousel-text">Upload your first track and begin your journey.</p>
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
