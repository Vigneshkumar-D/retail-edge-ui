// import React, { useState } from "react";

// import {
//   Button,
//   Checkbox,
//   Form,
//   Grid,
//   Input,
//   message,
//   Spin,
//   theme,
//   Typography,
// } from "antd";

// import {
//   ArrowRightOutlined,
//   LoadingOutlined,
//   LockOutlined,
//   MailOutlined,
//   SyncOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import ForgetPasswordService from "../service/defaultServices/authentication/forgotPasswordService";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;

// export default function ForgetPassword() {
//   const service = new ForgetPasswordService();
//   const { token } = useToken();
//   const screens = useBreakpoint();
//   const [resMessage, setResMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const onFinish = (values) => {
//     setIsLoading(true);
//     // console.log("hit");

//     service
//       .post(values)
//       .then((res) => {
//         message.success(res.data);
//         setResMessage(res.data);
//       })
//       .catch((err) => {
//         message.error(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
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
//     // <section style={{...styles.section,backgroundImage:"url('retail_edge_background_image')"}}>

//     <section
//       style={{
//         ...styles.section,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundColor: "black",
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
//         <Form
//           name="normal_login"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           layout="vertical"
//           requiredMark="optional"
//         >
//           {resMessage ? (
//             <h1
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 paddingBottom: "2rem",
//               }}
//             >
//               {resMessage}
//             </h1>
//           ) : (
//             <>
//               <Form.Item
//                 name="email"
//                 label={
//                   <div style={{ color: "white", fontWeight: "700" }}>EMAIL</div>
//                 }
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Email!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<MailOutlined />}
//                   type=""
//                   placeholder="Email"
//                   style={{ padding: "8px 12px" }}
//                 />
//               </Form.Item>

//               <Form.Item style={{ marginBottom: "0px" }}>
//                 <Button
//                   block="true"
//                   type="primary"
//                   htmlType="submit"
//                   style={{
//                     padding: "20px 12px",
//                     backgroundColor: isLoading ? "#1677ff" : undefined,
//                     borderColor: isLoading ? "#1677ff" : undefined,
//                     cursor: isLoading ? "not-allowed" : undefined,
//                   }}
//                   disabled={isLoading}
//                   icon={
//                     <Spin
//                       spinning={isLoading}
//                       indicator={<SyncOutlined spin />}
//                       // size="small"
//                       style={{ color: "white" }}
//                     />
//                   }
//                 >
//                   {!isLoading ? "Submit" : ""}
//                 </Button>
//               </Form.Item>
//               <Button
//               style={{
//                 background: "transparent",
//                 border:"none",
//                 padding:"5px",
//                 float: "right",
//                 marginTop:"10px"
//                 }}
//                 disabled={isLoading}>
//                 <Link to="/login"
//                   style={{
//                     float: "left",
//                     color: "white",
//                   }}>
//                   Login
//                   <ArrowRightOutlined style={{ paddingLeft: "3px", marginTop: "7px" }} />
//                 </Link>
//               </Button>
//             </>
//           )}
//         </Form>
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

import {
  ArrowRightOutlined,
  LoadingOutlined,
  LockOutlined,
  MailOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ForgetPasswordService from "../service/defaultServices/authentication/forgotPasswordService";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ForgetPassword() {
  const service = new ForgetPasswordService();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [resMessage, setResMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    // console.log("hit");

    service
      .post(values)
      .then((res) => {
        message.success(res.data);
        setResMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const styles = {
    // container: {
    //   margin: "0 auto",
    //   padding: screens.md
    //     ? `${token.paddingXL}px`
    //     : `${token.sizeXXL}px ${token.padding}px`,
    //   width: "300px",
    // },
    container: {
      backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
      // backgroundColor: "#4c5270",
      // opacity:".8",
      borderRadius: "10px",
      backdropFilter: "blur(28px)", // Optional for visual effect.
      padding: "1rem", // Inner padding.
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "auto", // Remove the fixed width for better flexibility.
      alignSelf: "flex-end", // Align the `div` itself to the right if needed.
      width: "350px",
      // height:"300px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      paddingTop: "10px",
      float: "right",
      color: "white",
    },
    header: {
      marginBottom: token.marginXL,
    },
    // section: {
    //   alignItems: "center",
    //   backgroundColor: token.colorBgContainer,
    //   display: "flex",
    //   height: screens.sm ? "100vh" : "auto",
    //   padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    // },
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
    text: {
      color: "white",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    // <section style={{...styles.section,backgroundImage:"url('retail_edge_background_image')"}}>

    <section
      style={{
        ...styles.section,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundColor: "black",
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
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          {resMessage ? (
            <h1
              style={{
                textAlign: "center",
                color: "#4c5270",
                paddingBottom: "2rem",
              }}
            >
              {/* {resMessage} */}
              We've emailed a password reset link. Please check your inbox.
            </h1>
          ) : (
            <>
              <Form.Item
                name="email"
                label={
                  <div style={{ color: "#4c5270", fontWeight: "700" }}>
                    EMAIL
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type=""
                  placeholder="Email"
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
                  {!isLoading ? "Submit" : ""}
                </Button>
              </Form.Item>
              <Button
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "5px",
                  float: "right",
                  marginTop: "10px",
                }}
                disabled={isLoading}
              >
                <Link
                  to="/login"
                  style={{
                    float: "left",
                    color: "#4c5270",
                  }}
                >
                  Login
                  <ArrowRightOutlined
                    style={{ paddingLeft: "3px", marginTop: "7px" }}
                  />
                </Link>
              </Button>
            </>
          )}
        </Form>
      </div>
    </section>
  );
}
