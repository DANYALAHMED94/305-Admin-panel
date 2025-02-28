import Football from "../../assets/ball-football-icon.svg";
import "../styles/singleBall.css";

const SingleLoadingBall = () => {
  return (
    <div className="loading-container">
      <img src={Football} alt="football-icon" className="singleBall" />
    </div>
  );
};

export default SingleLoadingBall;
