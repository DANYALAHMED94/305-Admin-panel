// import { useState } from "react";
// import logo from "../../assets/ball-football-icon.svg";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useUserContext } from "../../context";
// import "../styles/loadingAnimation.css";

// const schema = Yup.object().shape({
//   email: Yup.string().required("(Required)").email("Invalid email format"),
//   password: Yup.string()
//     .required("(Required)")
//     .min(8, "Password must be at least 8 characters"),
// });

// const LogIn = () => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isLogin, setLogin] = useState(false);

//   function togglePasswordVisibility() {
//     setIsPasswordVisible((prevState) => !prevState);
//   }

//   const { login } = useUserContext();

//   const handleSubmit = async (values) => {
//     setLogin(true);
//     const status = await login(values);
//     if (status) setLogin(false);
//     else setLogin(false);
//   };

//   return (
//     <div className="flex justify-between items-center p-3  h-screen">
//       <div className="w-[600px] rounded-xl p-8 flex flex-col gap-4 bg-[#222c3b] shadow-lg mx-auto">
//         <div className="flex h-full  justify-center items-center  ">
//           <img
//             alt="gallery"
//             className="w-12 object-cover h-12 object-center block bg-white p-1 rounded-md"
//             src={logo}
//           />
//         </div>

//         <div className="flex flex-col justify-center md:items-start items-center p-2  gap-1 text-gray-300">
//           <h1 className="font-semibold text-lg text-white ">Admin Login</h1>
//           <p className="text-md font-normal">
//             {" "}
//             Fill up all (<span className="text-red-500 ">*</span>) required
//             field!
//           </p>
//         </div>

//         <Formik
//           validationSchema={schema}
//           initialValues={{ email: "", password: "" }}
//           onSubmit={handleSubmit}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//           }) => (
//             <div className="login ">
//               <div className="form ">
//                 <form
//                   className=" flex flex-col gap-3 "
//                   noValidate
//                   onSubmit={handleSubmit}
//                 >
//                   <label
//                     className=" flex gap-1 text-gray-300 text-sm font-bold ml-1 mb-2"
//                     htmlFor="email"
//                   >
//                     Email<span className="text-red-500 ">*</span>
//                     <p className="error text-red-500">
//                       {errors.email && touched.email && errors.email}
//                     </p>
//                   </label>

//                   <div className="flex border border-gray-600 px-2 py-3 bg-[#222c3b]  rounded-lg ">
//                     <input
//                       type="email"
//                       name="email"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       value={values.email}
//                       className=" outline-none bg-transparent text-white px-2  w-full form-control "
//                       id="email"
//                       autoComplete="off"
//                     />
//                   </div>

//                   <label
//                     className="flex gap-1 text-gray-300 text-sm font-bold  ml-1 mb-2"
//                     htmlFor="password"
//                   >
//                     Password<span className="text-red-500 ">*</span>
//                     <p className="error text-red-500">
//                       {errors.password && touched.password && errors.password}
//                     </p>
//                   </label>
//                   <div className=" relative flex border  border-gray-600 px-2 py-3 rounded-lg">
//                     <input
//                       type={isPasswordVisible ? "text" : "password"}
//                       name="password"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       value={values.password}
//                       className="form-control text-gray-300 bg-[#222c3b] outline-none w-full px-2"
//                     />

//                     <button
//                       className="absolute inset-y-2 right-1   flex items-center px-4 text-gray-300"
//                       onClick={togglePasswordVisibility}
//                     >
//                       {isPasswordVisible ? (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6 "
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>

//                   <div className="w-full mt-6">
//                     <button
//                       className={` w-full hover:bg-blue-700 text-white font-base py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline flex justify-center transition ${
//                         isLogin
//                           ? "pointer-events-none bg-gray-500"
//                           : "bg-blue-500"
//                       }`}
//                       type="submit"
//                       onSubmit={handleSubmit}
//                     >
//                       {isLogin ? (
//                         <div className="load"></div>
//                       ) : (
//                         <p className="font-semibold">Log in</p>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default LogIn;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../../assets/ball-football-icon.svg";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useUserContext } from "../../context"; // Backend-related code commented
import "../styles/loadingAnimation.css";

const schema = Yup.object().shape({
  email: Yup.string().required("(Required)").email("Invalid email format"),
  password: Yup.string()
    .required("(Required)")
    .min(8, "Password must be at least 8 characters"),
});

const LogIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  // const { login } = useUserContext(); // Backend-related code commented

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleSubmit = async (values) => {
    setLogin(true);
    //  Backend API call commented
    /* const status = await login(values);
    if (status) {
      setLogin(false);
      navigate("/admin/dashboard"); // Redirect after login success
    } else {
      setLogin(false);
    } */

    setTimeout(() => {
      setLogin(false);
      navigate("/admin/dashboard"); // Directly navigating for frontend testing
    }, 1000);
  };

  return (
    <div className="flex justify-between items-center p-3 h-screen">
      <div className="w-[600px] rounded-xl p-8 flex flex-col gap-4 bg-[#222c3b] shadow-lg mx-auto">
        <div className="flex h-full justify-center items-center">
          <img
            alt="gallery"
            className="w-12 object-cover h-12 object-center block bg-white p-1 rounded-md"
            src={logo}
          />
        </div>

        <div className="flex flex-col justify-center md:items-start items-center p-2 gap-1 text-gray-300">
          <h1 className="font-semibold text-lg text-white">Admin Login</h1>
          <p className="text-md font-normal">
            Fill up all (<span className="text-red-500">*</span>) required
            fields!
          </p>
        </div>

        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form
                  className="flex flex-col gap-3"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <label
                    className="flex gap-1 text-gray-300 text-sm font-bold ml-1 mb-2"
                    htmlFor="email"
                  >
                    Email<span className="text-red-500">*</span>
                    <p className="error text-red-500">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </label>

                  <div className="flex border border-gray-600 px-2 py-3 bg-[#222c3b] rounded-lg">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="outline-none bg-transparent text-white px-2 w-full form-control"
                      id="email"
                      autoComplete="off"
                    />
                  </div>

                  <label
                    className="flex gap-1 text-gray-300 text-sm font-bold ml-1 mb-2"
                    htmlFor="password"
                  >
                    Password<span className="text-red-500">*</span>
                    <p className="error text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </label>

                  <div className="relative flex border border-gray-600 px-2 py-3 rounded-lg">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="form-control text-gray-300 bg-[#222c3b] outline-none w-full px-2"
                    />
                    <button
                      className="absolute inset-y-2 right-1 flex items-center px-4 text-gray-300"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? "🙈" : "👀"}
                    </button>
                  </div>

                  <div className="w-full mt-6">
                    <button
                      className={`w-full hover:bg-blue-700 text-white font-base py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline flex justify-center transition ${
                        isLogin
                          ? "pointer-events-none bg-gray-500"
                          : "bg-blue-500"
                      }`}
                      type="submit"
                    >
                      {isLogin ? (
                        <div className="load"></div>
                      ) : (
                        <p className="font-semibold">Log in</p>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
