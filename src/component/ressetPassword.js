// import React, { useState } from "react";

// import {
//   Button,
//   Form,
//   Grid,
//   Input,
//   message,
//   theme,
// } from "antd";

// import { LockOutlined } from "@ant-design/icons";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import ResetPasswordService from "../service/defaultServices/authentication/resetPasswordService";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;

// export default function ResetPassword() {
//   const [searchParams] = useSearchParams();

//   // Get the value of the 'token' query parameter
//   const reset_token = searchParams.get("token");
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [status, setStatus] = useState(false);
//   const service = new ResetPasswordService();
//   const { token } = useToken();
//   const screens = useBreakpoint();

//   const onFinish = (values) => {
//     service
//       .post(values, {
//         headers: {
//           token: reset_token, // Pass token under the key 'token'
//         },
//       })
//       .then((res) => {
//         message.success(res.data);
//         setStatus(true);
//         setSuccessMessage(res.data);
//       })
//       .catch((err) => {
//         setStatus(false);
//         message.error(err.data);
//       });
//   };

//   const styles = {
//     container: {
//       margin: "0 auto",
//       padding: screens.md
//         ? `${token.paddingXL}px`
//         : `${token.sizeXXL}px ${token.padding}px`,
//       width: "300px",
//     },
//     footer: {
//       marginTop: token.marginLG,
//       textAlign: "center",
//       width: "100%",
//     },
//     forgotPassword: {
//       paddingTop: "10px",
//       float: "right",
//       color: "white",
//     },
//     header: {
//       marginBottom: token.marginXL,
//     },
//     section: {
//       alignItems: "center",
//       backgroundColor: token.colorBgContainer,
//       display: "flex",
//       height: screens.sm ? "100vh" : "auto",
//       padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
//     },
//     text: {
//       color: "white",
//     },
//     title: {
//       fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
//     },
//   };

//   return (

//     <section
//       style={{
//         ...styles.section,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         background: "black",
//         // backgroundImage: `url(${process.env.PUBLIC_URL}/retail_edge_background_image.jpg)`,
//       }}
//     >
//       <div
//         style={{
//           ...styles.container,
//           backgroundColor: "rgba(240, 240, 240, 0.2)", // Black with 0.9 opacity
//           color: "white",
//           borderRadius: "10px",
//           backdropFilter: "blur(4px)", // Optional for adding a subtle blur
//           padding: "1rem", // Optional padding for a better look
//         }}
//       >
//         <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
//           <img
//             src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
//             alt="Logo"
//             style={{ width: "75%", height: "auto", borderRadius: "10px" }}
//           />
//         </div>
//         {status ? (
//           <>
//             <h1
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 paddingBottom: "2rem",
//               }}
//             >
//               {successMessage}
//             </h1>
//             <Link to="/login" style={styles.forgotPassword}>
//               Login
//             </Link>
//           </>
//         ) : (

//           <Form
//             name="normal_login"
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             layout="vertical"
//             requiredMark="optional"
//           >
//             <Form.Item
//               name="newPassword"
//               label={
//                 <div style={{ color: "white", fontWeight: "700" }}>
//                   NEW PASSWORD
//                 </div>
//               }
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your new password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 type="password"
//                 placeholder="New Password"
//                 style={{ padding: "8px 12px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label={
//                 <div style={{ color: "white", fontWeight: "700" }}>
//                   CONFIRM PASSWORD
//                 </div>
//               }
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your confirm password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 type="password"
//                 placeholder="Confirm Password"
//                 style={{ padding: "8px 12px" }}
//               />
//             </Form.Item>

//             <Form.Item style={{ marginBottom: "0px" }}>
//               <Button
//                 block="true"
//                 type="primary"
//                 htmlType="submit"
//                 style={{ padding: "20px 12px" }}
//               >
//                 Reset
//               </Button>
//             </Form.Item>
//             <Link to="/forget-password" style={styles.forgotPassword}>
//               Forgot password?
//             </Link>
//           </Form>

//         )
//         }

//       </div>
//     </section>

//   );
// }

import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  message,
  Spin,
  theme,
  Typography,
} from "antd";

import { LockOutlined, SyncOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import LoginService from "../service/defaultServices/authentication/loginService";
import Cookies from "js-cookie";
import ResetPasswordService from "../service/defaultServices/authentication/resetPasswordService";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  // Get the value of the 'token' query parameter
  const reset_token = searchParams.get("token")?.replace(/'/g, "");
  const [successMessage, setSuccessMessage] = useState(null);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const service = new ResetPasswordService();
  const { token } = useToken();
  const screens = useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    service
      .post(values, {
        headers: {
          token: reset_token, // Pass token under the key 'token'
        },
      })
      .then((res) => {
        message.success(res.data.message);
        setStatus(true);
        setSuccessMessage(res.data.message);
      })
      .catch((err) => {
        setStatus(false);
        message.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const styles = {
    container: {
      backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
      // backgroundColor: "#4c5270",
      // opacity:".8",
      borderRadius: "10px",
      backdropFilter: "blur(28px)", // Optional for visual effect.
      // padding: "1.5rem", // Inner padding.
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "auto", // Remove the fixed width for better flexibility.
      alignSelf: "flex-end", // Align the `div` itself to the right if needed.
      width: "350px",
    },
    // container: {
    //   margin: "0 auto",
    //   padding: screens.md
    //     ? `${token.paddingXL}px`
    //     : `${token.sizeXXL}px ${token.padding}px`,
    //   width: "300px",
    // },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      paddingTop: "10px",
      float: "right",
      color: "#4c5270",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      display: "flex",
      flexDirection: "column", // For vertical stacking; change to "row" if you want a horizontal layout.
      justifyContent: "center", // Vertically centers items.
      alignItems: "flex-end", // Aligns items horizontally to the right.
      minHeight: "100vh", // Ensures full viewport height.
      backgroundPosition: "center",
      backgroundSize: "cover",
      padding: screens.md ? `${token.sizeXXL}px 60px` : "10px",
      width: "100%", // Ensures the section spans the full width.
    },
    // section: {
    //   alignItems: "center",
    //   backgroundColor: token.colorBgContainer,
    //   display: "flex",
    //   height: screens.sm ? "100vh" : "auto",
    //   padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    // },
    text: {
      color: "white",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section
      style={{
        ...styles.section,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // minHeight: "100vh",
        // background: "black",
        backgroundImage: `url(${process.env.PUBLIC_URL}/retail_edge_background_image.jpg)`,
      }}
    >
      <div
        style={{
          ...styles.container,
          // backgroundColor: "rgba(240, 240, 240, 0.2)", // Black with 0.9 opacity
          // color: "white",
          // borderRadius: "10px",
          // backdropFilter: "blur(4px)", // Optional for adding a subtle blur
          // padding: "1rem", // Optional padding for a better look
        }}
      >
        <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
          <img
            src={`${process.env.PUBLIC_URL}/edge-logo1.png`}
            alt="Logo"
            style={{ width: "75%", height: "auto", borderRadius: "10px" }}
          />
        </div>
        {status ? (
          <>
            <h1
              style={{
                textAlign: "center",
                color: "#4c5270",
                paddingBottom: "2rem",
              }}
            >
              {successMessage}
            </h1>
            <Link to="/login" style={styles.forgotPassword}>
              Login
            </Link>
          </>
        ) : (
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="newPassword"
              label={
                <div style={{ color: "#4c5270", fontWeight: "700" }}>
                  NEW PASSWORD
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="New Password"
                style={{ padding: "8px 12px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <div style={{ color: "#4c5270", fontWeight: "700" }}>
                  CONFIRM PASSWORD
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                style={{ padding: "8px 12px" }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0px" }}>
              <Button
                block="true"
                type="primary"
                htmlType="submit"
                style={{
                  padding: "20px 12px",
                  backgroundColor: isLoading ? "#1677ff" : undefined,
                  borderColor: isLoading ? "#1677ff" : undefined,
                  cursor: isLoading ? "not-allowed" : undefined,
                }}
                disabled={isLoading}
                icon={
                  <Spin
                    spinning={isLoading}
                    indicator={<SyncOutlined spin />}
                    // size="small"
                    style={{ color: "white" }}
                  />
                }
              >
                {!isLoading ? "Reset" : ""}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </section>
  );
}
