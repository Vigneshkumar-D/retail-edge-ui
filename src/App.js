import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import ForgetPassword from "./component/forgetPassword";
import PageNotFound from "./component/pageNotFound";
import SignUp from "./component/signUp";
import HomePage from "./component/homePage";
import InventoryManagement from "./module/InventoryManagement/inventoryManagement";
import CustomerEngagement from "./module/CustomerEngagement/customerEngagement";
import FinanceManagement from "./module/FinanceManagement/financeManagement";
import ComplalinceAndService from "./module/ComplainceAndServices/complainc_and_service";
import UserManagement from "./module/UserManagement/userManagement";
import StoreSetup from "./module/StoreSetup/storeSetup";
import SalesAndBilling from "./module/SalesAndBilling/salesAndBilling";
import BusinessInsight from "./module/BusinessInsights/businessInsights";
import ResetPassword from "./component/ressetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />}>
          <Route
            path="inventory-management/*"
            element={<InventoryManagement />}
          />
          <Route path="sales-and-billing/*" element={<SalesAndBilling />} />
          <Route
            path="customer-engagement/*"
            element={<CustomerEngagement />}
          />
          <Route path="finance-management/*" element={<FinanceManagement />} />
          <Route
            path="complaince-and-services/*"
            element={<ComplalinceAndService />}
          />
          <Route path="user-management/*" element={<UserManagement />} />,
          <Route path="business-insights/*" element={<BusinessInsight />} />,
          <Route path="store-setup/*" element={<StoreSetup />} />,
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
