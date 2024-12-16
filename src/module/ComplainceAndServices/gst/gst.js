import { useRoutes } from "react-router-dom";
import GSTReport from "./gstReport";
import TaxAndHSNCode from "./taxAndHSNCode";

const GST = () => {
  const render = useRoutes([
    {
      path: "gst-report",
      element: <GSTReport />,
    },
    {
      path: "tax-and-hsn-code",
      element: <TaxAndHSNCode />,
    },
  ]);
  return <>{render}</>;
};

export default GST;
