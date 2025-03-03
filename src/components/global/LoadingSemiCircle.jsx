import "../styles/loadingAnimation.css";
const LoadingSemiCircle = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[40px] h-[40px] bg-gray-500 opacity-80 rounded-md flex items-center justify-center">
        <div className="load"></div>
      </div>
    </div>
  );
};

export default LoadingSemiCircle;
