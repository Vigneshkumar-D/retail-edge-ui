import { useRoutes } from "react-router-dom";
import CreditRemainder from "./creditRemainder";
import OfferAlert from "./offerAlert";
import Notification from "./notification";
import Customer from "./customer";

const CustomerEngagement = () => {
  const router = useRoutes([
    { path: "customer", element: <Customer /> },
    { path: "credit-remainder", element: <CreditRemainder /> },
    { path: "offer-alert", element: <OfferAlert /> },
    { path: "notification", element: <Notification /> },
  ]);
  return <>{router}</>;
};

export default CustomerEngagement;
