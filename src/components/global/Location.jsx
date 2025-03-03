import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Location = ({ location }) => {
  const getPathname = (pathname) => {
    const parts = pathname.split("/").filter((part) => part);

    const breadcrumbs = parts.map((part, index) => {
      const words = part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const route = "/" + parts.slice(0, index + 1).join("/");

      return { name: words, route };
    });

    return breadcrumbs;
  };

  const path = getPathname(location.pathname);

  return (
    <div className="p-2 flex text-sm font-semibold items-center gap-1">
      <Link to="/admin/dashboard">
        <FaHome className="h-5 w-5 text-blue-600 cursor-pointer transition hover:text-gray-600" />
      </Link>
      {path
        .filter((crumb) => crumb.name.toLowerCase() !== "admin")
        .map((crumb, index, arr) => (
          <span key={index} className="flex items-center">
            <p className="font-semibold">&gt;</p>
            <Link
              to={crumb.route}
              className={`${
                index === arr.length - 1
                  ? "text-blue-600"
                  : "text-gray-800 underline"
              } cursor-pointer transition hover:text-gray-600 mx-2`}
            >
              {crumb.name}
            </Link>
          </span>
        ))}
    </div>
  );
};

export default Location;
