// import React, { useEffect, useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PoweroffOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Button, Dropdown, Layout, Menu, theme } from "antd";
// import { Link, Navigate, useNavigate, useRoutes } from "react-router-dom";
// import Cookies from "js-cookie";
// import {
//   FaUsers,
//   FaChartLine,
//   FaFileInvoiceDollar,
// } from "react-icons/fa";
// import { AiOutlineSetting, AiFillProduct } from "react-icons/ai";
// import {
//   MdOutlineManageAccounts,
//   MdPayment,
//   MdAccountBalance,
// } from "react-icons/md";
// import Dashboard from "../module/Dashboard/dashboard";
// import InventoryManagement from "../module/InventoryManagement/inventoryManagement";
// import SalesAndBilling from "../module/SalesAndBilling/salesAndBilling";
// import CustomerEngagement from "../module/CustomerEngagement/customerEngagement";
// import FinanceManagement from "../module/FinanceManagement/financeManagement";
// import ComplalinceAndService from "../module/ComplainceAndServices/complainc_and_service";
// import UserManagement from "../module/UserManagement/userManagement";

// const { Header, Sider, Content } = Layout;

// const HomePage = () => {
//   const token = Cookies.get("login_token");
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const menuItems = [
//     {
//       key: "dashboard",
//       label: "Dashboard",
//       icon: <MdPayment style={{ fontSize: "20px" }} />,
//       path: "/",
//     },
//     {
//       key: "inventory-management",
//       label: "Inventory Management",
//       icon: <AiFillProduct style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "product-management",
//           label: "Product Management",
//           children: [
//             {
//               key: "product",
//               label: "Product",
//               path: "/inventory-management/procuct-management/product",
//             },
//             {
//               key: "category",
//               label: "Category",
//               path: "/inventory-management/procuct-management/category", // Make sure this is the correct path
//             },
//             {
//               key: "stock-transaction",
//               label: "Stock Transaction",
//               path: "/inventory-management/procuct-management/stock-transaction",
//             },
//           ],
//         },
//         {
//           key: "supplier-management",
//           label: "Supplier Management",
//           path: "inventory-management/supplier-management",
//           children: [
//             {
//               key: "supplierDashboard",
//               label: "Dashboard",
//               path: "/inventory-management/supplier-management/dashboard",
//             },
//             {
//               key: "suppiler",
//               label: "Suppiler",
//               path: "/inventory-management/supplier-management/supplier",
//             },
//             {
//               key: "purchase-orders",
//               label: "Purchase Orders",
//               path: "/inventory-management/supplier-management/purchase-orders",
//             },
//             {
//               key: "payment",
//               label: "Payments",
//               path: "/inventory-management/supplier-management/payments",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       key: "sales-and-billing",
//       label: "Sales and Billing",
//       icon: <FaFileInvoiceDollar style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "order",
//           label: "Order",
//           path: "/sales-and-billing/order",
//         },
//         {
//           key: "invoice-generation",
//           label: "Invoice Generation",
//           path: "/sales-and-billing/invoice-generation",
//         },
//       ],
//     },
//     {
//       key: "customer-engagement",
//       label: "Customer Engagement",
//       icon: <MdOutlineManageAccounts style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "customer-management",
//           label: "Customer Management",
//           children: [
//             {
//               key: "customer",
//               label: "Customer",
//               path: "/customer-engagement/customer-management/customer",
//             },
//             {
//               key: "purchase",
//               label: "Purchase",
//               path: "/customer-engagement/customer-management/purchase",
//             },
//           ],
//         },

//         {
//           key: "credit-reminder",
//           label: "Credit Reminder",
//           // icon: <ImCreditCard style={{ fontSize: "20px" }} />,/
//           path: "/customer-engagement/credit-remainder",
//         },
//         {
//           key: "offer-alert",
//           label: "Offer Alert",
//           // icon: <FaBell style={{ fontSize: "20px" }} />,
//           path: "/customer-engagement/offer-alert",
//         },
//         {
//           key: "notification",
//           label: "Notification",
//           // icon: <FaBell style={{ fontSize: "20px" }} />,
//           path: "/customer-engagement/notification",
//         },
//       ],
//     },
//     {
//       key: "finance-management",
//       label: "Finance Management",
//       icon: <MdAccountBalance style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "accounts",
//           label: "Accounts",
//           path: "/finance-management/accounts",
//         },
//         {
//           key: "emi",
//           label: "EMI",
//           path: "/finance-management/emi",
//         },
//         {
//           key: "payment-gateway",
//           label: "Payment Gateway",
//           path: "/finance-management/payment-gateway",
//         },
//       ],
//     },
//     {
//       key: "business-insights",
//       label: "Business Insights",
//       icon: <FaChartLine style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "reports",
//           label: "Reports",
//           path: "/reports",
//         },
//         {
//           key: "analytics",
//           label: "Analytics",
//           path: "/analytics",
//         },
//       ],
//     },
//     {
//       key: "complaince-and-services",
//       label: "Complaince and Services",
//       icon: <AiOutlineSetting style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "gst",
//           label: "GST",
//           children: [
//             {
//               key: "gst-report",
//               label: "GST Report",
//               path: "complaince-and-services/gst/gst-report",
//             },
//             {
//               key: "hsn-code",
//               label: "Tax and HSN Code",
//               path: "complaince-and-services/gst/tax-and-hsn-code",
//             },
//           ],
//         },

//         {
//           key: "service-management",
//           label: "Service Management",
//           children: [
//             {
//               key: "paid-service",
//               label: "Paid Services",
//               path: "complaince-and-services/service-management/paid-service",
//             },
//             {
//               key: "warranty",
//               label: "Warranty Services",
//               path: "complaince-and-services/service-management/warranty-service",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       key: "user-management",
//       label: "User Management",
//       icon: <FaUsers style={{ fontSize: "20px" }} />,
//       children: [
//         {
//           key: "user",
//           label: "User",
//           path: "/user-management/user",
//         },
//         {
//           key: "role",
//           label: "Role",
//           path: "/user-management/role",
//         },
//         {
//           key: "user-access",
//           label: "User Access",
//           path: "/user-management/user-access",
//         },
//         {
//           key: "email-and-sms-configuration",
//           label: "Email and SMS Configuration",
//           path: "/user-management/email-and-sms-configuration",
//         },
//       ],
//     },
//   ];

//   const renderMenuItems = (items) =>
//     items.map((item) => {
//       if (item.children) {
//         return {
//           key: item.key,
//           icon: item.icon,
//           label: item.label,
//           children: renderMenuItems(item.children),
//         };
//       }

//       return {
//         key: item.key,
//         icon: item.icon,
//         label: <Link to={item.path}>{item.label}</Link>,
//       };
//     });

//   const render = useRoutes([
//     { index: true, element: <Dashboard /> },
//     { path: "inventory-management/*", element: <InventoryManagement /> },
//     { path: "sales-and-billing/*", element: <SalesAndBilling /> },
//     { path: "customer-engagement/*", element: <CustomerEngagement /> },
//     { path: "finance-management/*", element: <FinanceManagement /> },
//     { path: "complaince-and-services/*", element: <ComplalinceAndService /> },
//     { path: "user-management/*", element: <UserManagement /> },
//   ]);

//   // Function to refresh the token expiration on user activity
//   const refreshTokenExpiration = () => {
//     const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
//     const token = Cookies.get("login_token");
//     if (token) {
//       Cookies.set("login_token", token, { expires: expirationTime });
//     }
//   };

//   useEffect(() => {
//     // Add event listeners for user activity
//     window.addEventListener("mousemove", refreshTokenExpiration);
//     window.addEventListener("keydown", refreshTokenExpiration);

//     // Cleanup event listeners on component unmount
//     return () => {
//       window.removeEventListener("mousemove", refreshTokenExpiration);
//       window.removeEventListener("keydown", refreshTokenExpiration);
//     };
//   }, []);

//   return token ? (
//     <Layout style={{ height: "100vh" }}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         theme="dark"
//         width={240}
//         style={{ height: "100vh", overflowY: "scroll", scrollbarWidth: "none" }} // Hide overflow on the Sider
//       >
//         <div
//           style={{
//             textAlign: "center",
//             paddingTop: "8px",
//             marginBottom: "0px",
//             position: "sticky",
//             top: 0,
//             // backgroundColor: "#001529",
//             zIndex: 1,
//           }}
//         >
//           <img
//             src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
//             alt="Logo"
//             style={{ width: "75%", height: "auto", borderRadius: "10px" }}
//           />
//         </div>
//         <div
//           style={{
//             height: "calc(100vh - 36px)",
//             overflowY: "auto",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <Menu
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             theme="dark"
//             items={renderMenuItems(menuItems)}
//             style={{
//               overflowY: "auto",
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }} // Hide scrollbar
//           />
//         </div>
//         <div
//           style={{
//             textAlign: "center",
//             paddingTop: "8px",
//             marginBottom: "0px",
//             position: "sticky",
//             bottom: 0,
//             // backgroundColor: "#001529",
//             zIndex: 1,
//           }}
//         >
//           <img
//             src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
//             alt="Logo"
//             style={{ width: "75%", height: "auto", borderRadius: "10px" }}
//           />
//         </div>
//       </Sider>

//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             display:"flex",
//             justifyContent:"space-between",
//             alignItems:"center",
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />

//           <Dropdown
//             menu={{
//               items: [
//                 {
//                   key: 1,
//                   label: (
//                     <Button
//                       type="text"
//                       icon={<PoweroffOutlined />}
//                       onClick={() => {
//                         Cookies.remove("login_token");
//                         navigate("/login", { replace: true });
//                       }}
//                       style={{
//                         fontSize: "16px",
//                       }}
//                     >Log out</Button>
//                   ),
//                 },
//               ],
//             }}
//             placement="bottomRight"
//             arrow
//           >
//             <Button style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//               border:"none"
//             }}>
//               <UserOutlined />
//             </Button>
//           </Dropdown>
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             // background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//             maxHeight: "82vh",
//             overflowY:"scroll"
//           }}
//         >
//           {render}
//         </Content>
//       </Layout>
//     </Layout>
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Navigate, useNavigate, useRoutes } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FaUsers,
  FaChartLine,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { AiOutlineSetting, AiFillProduct } from "react-icons/ai";
import {
  MdOutlineManageAccounts,
  MdPayment,
  MdAccountBalance,
} from "react-icons/md";
import Dashboard from "../module/Dashboard/dashboard";
import InventoryManagement from "../module/InventoryManagement/inventoryManagement";
import SalesAndBilling from "../module/SalesAndBilling/salesAndBilling";
import CustomerEngagement from "../module/CustomerEngagement/customerEngagement";
import FinanceManagement from "../module/FinanceManagement/financeManagement";
import ComplalinceAndService from "../module/ComplainceAndServices/complainc_and_service";
import UserManagement from "../module/UserManagement/userManagement";
 
const { Header, Sider, Content } = Layout;
 
const HomePage = () => {
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
              key: "category",
              label: "Category",
              path: "/inventory-management/procuct-management/category", // Make sure this is the correct path
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
          path: "/sales-and-billing/order",
        },
        {
          key: "invoice-generation",
          label: "Invoice Generation",
          path: "/sales-and-billing/invoice-generation",
        },
      ],
    },
    {
      key: "customer-engagement",
      label: "Customer Engagement",
      icon: <MdOutlineManageAccounts style={{ fontSize: "20px" }} />,
      children: [
        {
          key: "customer-management",
          label: "Customer Management",
          children: [
            {
              key: "customer",
              label: "Customer",
              path: "/customer-engagement/customer-management/customer",
            },
            {
              key: "purchase",
              label: "Purchase",
              path: "/customer-engagement/customer-management/purchase",
            },
          ],
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
          key: "payment-gateway",
          label: "Payment Gateway",
          path: "/finance-management/payment-gateway",
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
          path: "/reports",
        },
        {
          key: "analytics",
          label: "Analytics",
          path: "/analytics",
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
      key: "user-management",
      label: "User Management",
      icon: <FaUsers style={{ fontSize: "20px" }} />,
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
    // Add event listeners for user activity
    window.addEventListener("mousemove", refreshTokenExpiration);
    window.addEventListener("keydown", refreshTokenExpiration);
 
    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", refreshTokenExpiration);
      window.removeEventListener("keydown", refreshTokenExpiration);
    };
  }, []);
 
  return token ? (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        width={240}
        style={{ height: "100vh", overflowY: "scroll", scrollbarWidth: "none" }} // Hide overflow on the Sider
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            marginBottom: "0px",
            position: "sticky",
            top: 0,
            backgroundColor: "#001529",
            zIndex: 1,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/edge-logo2.png`}
            alt="Logo"
            onClick={() => {navigate("/")}}
            style={{ width: "75%", height: "auto", borderRadius: "10px", cursor:'pointer' }}
          />
        </div>
        <div
          style={{
            height: "calc(100vh - 36px)",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
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
            backgroundColor: "#001529",
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
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
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
 
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Button
                      type="text"
                      icon={<PoweroffOutlined />}
                      onClick={() => {
                        Cookies.remove("login_token");
                        navigate("/login", { replace: true });
                      }}
                      style={{
                        fontSize: "16px",
                      }}
                    >Log out</Button>
                  ),
                },
              ],
            }}
            placement="bottomRight"
            arrow
          >
            <Button style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              border:"none"
            }}>
              <UserOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
            maxHeight: "82vh",
            overflowY:"scroll"
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
 
 