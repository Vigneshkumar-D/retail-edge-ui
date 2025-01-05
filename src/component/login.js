import React, { useState } from "react";

import { Button, Form, Grid, Input, message, Spin, theme } from "antd";

import { LockOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginService from "../service/defaultServices/authentication/loginService";
import Cookies from "js-cookie";
import Dashboard from "../module/Dashboard/dashboard";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Login() {
  const navigate = useNavigate();
  const service = new LoginService();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    service
      .post(values)
      .then((res) => {
        const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000); // Set for 10 minutes
        Cookies.set("login_token", res.data.message, {
          expires: expirationTime,
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const msg = err.response.data?.message
          ? err.response.data.message
          : err.message;
        message.error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const styles = {
    container: {
      backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
      borderRadius: "10px",
      backdropFilter: "blur(28px)", // Optional for visual effect.
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "auto", // Remove the fixed width for better flexibility.
      alignSelf: "flex-end", // Align the `div` itself to the right if needed.
      width: "350px",
    },

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

    text: {
      color: "black",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  const loginToken = Cookies.get("login_token");

  return loginToken ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <section
        style={{
          ...styles.section,
          backgroundImage: `url(${process.env.PUBLIC_URL}/retail_edge_background_image.jpg)`,
        }}
      >
        <div
          style={{
            ...styles.container,
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
            <Form.Item
              name="username"
              label={
                <span style={{ color: "#4c5270", fontWeight: "700" }}>
                  USERNAME
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                style={{ padding: "8px 12px" }}
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <div style={{ color: "#4c5270", fontWeight: "700" }}>
                  PASSWORD
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
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
                {!isLoading ? "Log in" : ""}
              </Button>
            </Form.Item>
            <Link to="/forget-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </Form>
        </div>
      </section>
    </>
  );
}
