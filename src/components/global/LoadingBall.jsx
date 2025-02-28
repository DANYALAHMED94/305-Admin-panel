import Football from "../../assets/ball-football-icon.svg";
import "../styles/loadingball.css";

const LoadingBall = () => {
  return (
    <div className="main">
      <div className="ball-container">
        <img src={Football} alt="football-icon" className="ball" />
        <img src={Football} alt="football-icon" className="ball" />
        <img src={Football} alt="football-icon" className="ball" />
      </div>
    </div>
  );
};

export default LoadingBall;
