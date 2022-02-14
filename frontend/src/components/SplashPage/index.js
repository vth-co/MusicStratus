import { NavLink } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './SplashPage.css'

function SplashPage() {

    return (
        <div className="splash-main">
        <img
             className="background-img"
             src="../../../images/background.jpg"
             alt=""
        ></img> 
        </div>
    )
}

export default SplashPage;
