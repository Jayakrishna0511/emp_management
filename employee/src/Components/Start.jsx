
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Start = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/verify")
//       .then((result) => {
//         if (result.data.Status) {
//           if (result.data.role === "admin") {
//             navigate("/dashboard");
//           } else {
//             navigate("/employee_detail/" + result.data.id);
//           }
//         } else {
//           navigate("/");
//         }
//       });
//   }, []);

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
//       <div className="p-3 rounded w-75 w-sm-50 w-md-25 border loginForm">
//         <h2 className="text-center">Login As</h2>
//         <div className="d-flex justify-content-between mt-5 mb-2 flex-column flex-sm-row">
//           <button
//             type="button"
//             className="btn btn-primary mb-2 mb-sm-0 w-100 w-sm-auto"
//             onClick={() => {
//               navigate("/employee_login");
//             }}
//           >
//             Employee
//           </button>
//           <button
//             type="button"
//             className="btn btn-success w-100 w-sm-auto"
//             onClick={() => {
//               navigate("/adminlogin");
//             }}
//           >
//             Admin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Start;




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        } else {
          navigate("/");
        }
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 w-sm-50 w-md-25 w-lg-25 max-width-500px border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-content-between mt-5 mb-2 flex-column flex-sm-row">
          <button
            type="button"
            className="btn btn-primary mb-2 mb-sm-0 w-auto w-sm-auto me-sm-2 btn-sm"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Employee
          </button>
          <button
            type="button"
            className="btn btn-success w-auto w-sm-auto btn-sm"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
