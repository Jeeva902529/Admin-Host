import { Routes, Route } from "react-router-dom";
import CashierHome from "../Cashier/Components/Cashier.jsx";


export default function CashierRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CashierHome />} />
     
    </Routes>
  );
}
