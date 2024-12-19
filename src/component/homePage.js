import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, message, theme, Tooltip } from "antd";
import { Link, Navigate, useNavigate, useRoutes } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUsers, FaChartLine, FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineSetting, AiFillProduct } from "react-icons/ai";
import {
  MdOutlineManageAccounts,
  MdPayment,
  MdAccountBalance,
} from "react-icons/md";
import Dashboard from "../module/Dashboard/dashboard";
import InventoryManagement from "../module/InventoryManagement/inventoryManagement";
import CustomerEngagement from "../module/CustomerEngagement/customerEngagement";
import FinanceManagement from "../module/FinanceManagement/financeManagement";
import ComplalinceAndService from "../module/ComplainceAndServices/complainc_and_service";
import UserManagement from "../module/UserManagement/userManagement";
import { BsShop } from "react-icons/bs";
import StoreSetup from "../module/StoreSetup/storeSetup";
import SalesAndBilling from "../module/SalesAndBilling/salesAndBilling";
import BusinessInsight from "../module/BusinessInsights/businessInsights";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaChevronDown, FaUserTie } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FaSearch, FaBell, FaUser } from 'react-icons/fa'; // Font Awesome icons
import { MdDashboard, MdSettings } from 'react-icons/md';
import { MdOutlineSwitchAccessShortcutAdd } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { IoArrowRedo } from "react-icons/io5";
import CurrentUserService from "../service/customizeServices/UserManagements/currentUserSevice";



const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const service = new CurrentUserService()
  const [currentUser, setCurrentUser] = useState("");
  const token = Cookies.get("login_token");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <MdPayment style={{ fontSize: "20px" }} />,
      path: "/",
    },
    {
      key: "inventory-management",
      label: "Inventory Management",
      icon: <AiFillProduct style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "product-management",
          label: "Product Management",
          children: [
            {
              key: "product",
              label: "Product",
              path: "/inventory-management/procuct-management/product",
            },
            {
              key: "stock-transaction",
              label: "Stock Transaction",
              path: "/inventory-management/procuct-management/stock-transaction",
            },
          ],
        },
        {
          key: "supplier-management",
          label: "Supplier Management",
          path: "inventory-management/supplier-management",
          children: [
            {
              key: "supplierDashboard",
              label: "Dashboard",
              path: "/inventory-management/supplier-management/dashboard",
            },
            {
              key: "suppiler",
              label: "Suppiler",
              path: "/inventory-management/supplier-management/supplier",
            },
            {
              key: "purchase-orders",
              label: "Purchase Orders",
              path: "/inventory-management/supplier-management/purchase-orders",
            },
            {
              key: "payment",
              label: "Payments",
              path: "/inventory-management/supplier-management/payments",
            },
          ],
        },
      ],
    },
    {
      key: "sales-and-billing",
      label: "Sales and Billing",
      icon: <FaFileInvoiceDollar style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "order",
          label: "Order",
          path: "/sales-and-billing/order/history",
        },
        {
          key: "invoice",
          label: "Invoice",
          children: [
            {
              key: "new",
              label: "New",
              path: "/sales-and-billing/invoice/new",
            },
            {
              key: "history",
              label: "History",
              path: "/sales-and-billing/invoice/history",
            },
          ],
        },
      ],
    },
    {
      key: "customer-engagement",
      label: "Customer Engagement",
      icon: <MdOutlineManageAccounts style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "customer",
          label: "Customer",
          path: "/customer-engagement/customer",
        },

        {
          key: "credit-reminder",
          label: "Credit Reminder",
          // icon: <ImCreditCard style={{ fontSize: "20px" }} />,/
          path: "/customer-engagement/credit-remainder",
        },
        {
          key: "offer-alert",
          label: "Offer Alert",
          // icon: <FaBell style={{ fontSize: "20px" }} />,
          path: "/customer-engagement/offer-alert",
        },
        {
          key: "notification",
          label: "Notification",
          // icon: <FaBell style={{ fontSize: "20px" }} />,
          path: "/customer-engagement/notification",
        },
      ],
    },
    {
      key: "finance-management",
      label: "Finance Management",
      icon: <MdAccountBalance style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "accounts",
          label: "Accounts",
          path: "/finance-management/accounts",
        },
        {
          key: "emi",
          label: "EMI",
          path: "/finance-management/emi",
        },
        {
          key: "expence",
          label: "Expence",
          path: "/finance-management/expence",
        },
        {
          key: "settlement",
          label: "Settlement",
          path: "/finance-management/settlement",
        },
      ],
    },
    {
      key: "business-insights",
      label: "Business Insights",
      icon: <FaChartLine style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "reports",
          label: "Reports",
          path: "business-insights/reports",
        },
        {
          key: "analytics",
          label: "Analytics",
          path: "business-insights/analytics",
        },
      ],
    },
    {
      key: "complaince-and-services",
      label: "Complaince and Services",
      icon: <AiOutlineSetting style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "gst",
          label: "GST",
          children: [
            {
              key: "gst-report",
              label: "GST Report",
              path: "complaince-and-services/gst/gst-report",
            },
            {
              key: "hsn-code",
              label: "Tax and HSN Code",
              path: "complaince-and-services/gst/tax-and-hsn-code",
            },
          ],
        },

        {
          key: "service-management",
          label: "Service Management",
          children: [
            {
              key: "paid-service",
              label: "Paid Services",
              path: "complaince-and-services/service-management/paid-service",
            },
            {
              key: "warranty",
              label: "Warranty Services",
              path: "complaince-and-services/service-management/warranty-service",
            },
          ],
        },
      ],
    },
    {
      key: "store-setup",
      label: "Store Management",
      icon: <BsShop style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "user",
          label: "User",
          path: "/user-management/user",
        },
        {
          key: "role",
          label: "Role",
          path: "/user-management/role",
        },
        {
          key: "user-access",
          label: "User Access",
          path: "/user-management/user-access",
        },
        {
          key: "sore-details",
          label: "Store Details",
          path: "/store-setup/store-details",
        },
        {
          key: "email-and-sms-configuration",
          label: "Email and SMS Configuration",
          path: "/user-management/email-and-sms-configuration",
        },
      ],
    },
  ];

  const renderMenuItems = (items) =>
    items.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: renderMenuItems(item.children),
        };
      }

      return {
        key: item.key,
        icon: item.icon,
        label: <Link to={item.path}>{item.label}</Link>,
      };
    });

  const render = useRoutes([
    { index: true, element: <Dashboard /> },
    { path: "inventory-management/*", element: <InventoryManagement /> },
    { path: "sales-and-billing/*", element: <SalesAndBilling /> },
    { path: "customer-engagement/*", element: <CustomerEngagement /> },
    { path: "finance-management/*", element: <FinanceManagement /> },
    { path: "complaince-and-services/*", element: <ComplalinceAndService /> },
    { path: "user-management/*", element: <UserManagement /> },
    { path: "store-setup/*", element: <StoreSetup /> },
    { path: "business-insights/*", element: <BusinessInsight /> },
  ]);

  // Function to refresh the token expiration on user activity
  const refreshTokenExpiration = () => {
    const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
    const token = Cookies.get("login_token");
    if (token) {
      Cookies.set("login_token", token, { expires: expirationTime });
    }
  };

  useEffect(() => {
    service
      .getAll()
      .then((res) => {
      
        setCurrentUser(res.data?.data);
      })
      .catch((err) => {
        const msg = err.data?.message ? err.response.data.message : err.message;
        message.error(msg);
      })
      .finally(() => {
        // setIsLoading(false);
      });
    // Add event listeners for user activity
    window.addEventListener("mousemove", refreshTokenExpiration);
    window.addEventListener("keydown", refreshTokenExpiration);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", refreshTokenExpiration);
      window.removeEventListener("keydown", refreshTokenExpiration);
    };

  }, []);

  const dropDownStyle = {
    background: "none",
    fontSize: "16px",
    padding: "0px"
  }


  const quickAccessMenu = (
    <Menu
      items={[
        {
          key: 1,
          label: (
            <Tooltip placement="bottom" title="Product">
              <Button
                type="text"
                icon={<>📦</>}
                // icon={<FaUserTie style={{fontSize:"20px", color:"blueviolet"}} />}
                onClick={() => {
                  navigate("/inventory-management/procuct-management/product", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 2,
          label: (
            <Tooltip placement="bottom" title="Invoice">
              <Button
                type="text"
                // icon={<CiSettings style={{fontSize:"20px", color:"green"}} />}
                // icon={<p>⚙️</p>}
                icon={<>🧾</>}
                onClick={() => {

                  navigate("/sales-and-billing/invoice/new", { replace: true });

                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 3,
          label: (
            <Tooltip placement="bottom" title="Customer">
              <Button
                type="text"
                icon={<>👥</>}
                // icon={<TbPasswordFingerprint style={{fontSize:"20px",color:"orange" }}/>}
                onClick={() => {
                  // Cookies.remove("login_token");
                  navigate("/customer-engagement/customer", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 4,
          label: (
            <Tooltip placement="bottom" title="Get Report">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>📈</p>}
                onClick={() => {

                  navigate("/business-insights/reports", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 5,
          label: (
            <Tooltip placement="bottom" title="Offer">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>🎁</p>}
                onClick={() => {

                  navigate("/customer-engagement/offer-alert", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 6,
          label: (
            <Tooltip placement="top" title="Purchase order">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>🛒</p>}
                onClick={() => {

                  navigate("/inventory-management/supplier-management/purchase-orders", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 7,
          label: (
            <Tooltip placement="bottom" title="Customer order">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>🛍️</p>}
                onClick={() => {

                  navigate("/sales-and-billing/order", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 8,
          label: (
            <Tooltip placement="top" title="Expense">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>💳</p>}
                onClick={() => {

                  navigate("/finance-management/expence", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
        {
          key: 8,
          label: (
            <Tooltip placement="top" title="Settlemet">
              <Button
                type="text"
                // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                icon={<p>🤝</p>}
                onClick={() => {

                  navigate("/finance-management/settlement", { replace: true });
                }}
                style={dropDownStyle}
              >

              </Button>
            </Tooltip>
          ),
        },
      ]}
      style={{
        display: 'flex',
        flexWrap: "wrap",
        width: "200px",
        gap: '10px',

      }}
    />
  )

  return token ? (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        width={250}
        style={{ height: "100vh", overflowY: "scroll", scrollbarWidth: "none" }} // Hide overflow on the Sider
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            marginBottom: "0px",
            position: "sticky",
            top: 0,
            // backgroundColor: "#001529",
            // backgroundColor: "rgba(240, 240, 240, 0.2)",
            backdropFilter: "blur(38px)",
            zIndex: 1,
          }}
        >
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
              alt="Logo"
              style={{ width: "75%", height: "auto", borderRadius: "10px" }}
            />
          </Link>
        </div>
        <div
          style={{
            height: "calc(100vh - 36px)",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            backgroundColor: "#001529",
            // backgroundColor: "rgba(240, 240, 240, 0.2)",
            // backdropFilter: "blur(38px)",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            theme="dark"
            items={renderMenuItems(menuItems)}
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              //   backgroundColor: "transparent",
              // //   backgroundColor: "rgba(240, 240, 240, 0.2)",
              // // backdropFilter: "blur(18px)",
            }} // Hide scrollbar
          />
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            marginBottom: "0px",
            position: "sticky",
            bottom: 0,
            // backgroundColor: "#001529",
            zIndex: 1,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
            alt="Logo"
            style={{ width: "75%", height: "auto", borderRadius: "10px" }}
          />
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />


          <div style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", alignSelf: "center", justifyContent: "space-around", minWidth: "180px", maxWidth:"280px", }}>
            <Dropdown
              overlay={quickAccessMenu}
              placement="bottom"
              arrow
              trigger={['click']}
              color="blue"
            >
              <Tooltip placement="right" title="Quick Access">
                <Button
                  style={{
                    fontSize: "16px",
                    width: 20,
                    height: 20,
                    border: "none",
                    padding: "0px",
                    alignItems: "center"
                  }}

                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <IoArrowRedo style={{ height: "25px", cursor: "pointer", color: "", width: "25px", }} />
                  </div>

                </Button>
              </Tooltip>
            </Dropdown>

            <Tooltip placement="right" title="Notifications">
              <MdOutlineNotificationsActive style={{ height: "25px", cursor: "pointer", color: "", width: "25px", }} />
            </Tooltip>
           
            <img src= {currentUser?.profileImage !== null ? `data:image/png;base64,${currentUser?.profileImage}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile Picture" style={{ height: "30px", width: "30px", borderRadius: "50%", cursor: "pointer" }} />
            {/* <img src="" alt="GHJ" style={{ height: "30px", width: "30px", borderRadius: "50%", cursor: "pointer" }} /> */}
            <p style={{ fontWeight: "600", cursor: "pointer" }}>{currentUser?.username}</p>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      <Button
                        type="text"
                        icon={<>👤</>}
                        // icon={<FaUserTie style={{fontSize:"20px", color:"blueviolet"}} />}
                        onClick={() => {
                          // Cookies.remove("login_token");
                          // navigate("/login", { replace: true });

                        }}
                        style={dropDownStyle}
                      >
                        Profile
                      </Button>
                    ),
                  },
                  {
                    key: 2,
                    label: (
                      <Button
                        type="text"
                        // icon={<CiSettings style={{fontSize:"20px", color:"green"}} />}
                        // icon={<p>⚙️</p>}
                        icon={<>🛠️</>}
                        onClick={() => {
                          // Cookies.remove("login_token");
                          // navigate("/login", { replace: true });

                        }}
                        style={dropDownStyle}
                      >
                        Settings
                      </Button>
                    ),
                  }, {
                    key: 3,
                    label: (
                      <Button
                        type="text"
                        icon={<TbPasswordFingerprint style={{ fontSize: "20px", color: "" }} />}
                        onClick={() => {
                          // Cookies.remove("login_token");
                          // navigate("/login", { replace: true });
                        }}
                        style={dropDownStyle}
                      >
                        Change password
                      </Button>
                    ),
                  },
                  {
                    key: 4,
                    label: (
                      <Button
                        type="text"
                        // icon={<PoweroffOutlined style={{fontSize:"16px", color:"red", padding:"2px"}}/>}
                        icon={<p>🔓</p>}
                        onClick={() => {
                          Cookies.remove("login_token");
                          navigate("/login", { replace: true });
                        }}
                        style={dropDownStyle}
                      >
                        Logout
                      </Button>
                    ),
                  },
                ],
              }}
              placement="bottomRight"
              arrow
              trigger={['click']}
            >
              <Button
                style={{
                  fontSize: "16px",
                  width: 20,
                  height: 20,
                  border: "none",
                  padding: "0px",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                  <FaChevronDown />
                </div>

              </Button>

            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
            maxHeight: "82vh",
            overflowY: "scroll",
          }}
        >
          {render}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
