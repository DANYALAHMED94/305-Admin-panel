import PropTypes from "prop-types";

const User = ({ name, imgSrc }) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
  const getInitials = (name) => {
    if (!name) {
      name = "John Doe";
      let firstInitial = name.charAt(0);
      let lastInitial = name.split(" ")[1].charAt(0);
      return firstInitial + lastInitial;
    } else {
      let firstInitial = name.charAt(0);
      let lastInitial = name.split(" ")[1].charAt(0);
      return firstInitial + lastInitial;
    }
  };
  return (
    <div className="w-max overflow-hidden">
      {imgSrc ? (
        <img
          src={imgSrc}
          className="rounded-full w-[40px] h-[40px] m-1 border-2 shadow-sm border-blue-600 cursor-pointer"
        ></img>
      ) : (
        <div
          className={`font-bold rounded-full w-[40px] h-[40px] text-white text-xl ${randomColorClass} flex justify-center items-center m-1 border-2 border-blue-600 cursor-pointer shadow-sm`}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};
User.propTypes = {
  name: PropTypes.string,
  imgSrc: PropTypes.string,
};
export default User;
