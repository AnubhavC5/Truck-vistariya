import "./App.css";

import { TruckDashboard } from "@/components/truck-dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShipmentDashboardComponent } from "./components/shipment-dashboard";
import { DriverManagementComponent } from "./components/driver-management";
import { TransportDashboardComponent } from "./components/transport-dashboard";

import { EnhancedClientManagement } from "./components/enhanced-client-management";
import { EnhancedBillingPageComponent } from "./components/enhanced-billing-page";
import Login from "./components/login-page";
import Signup from "./components/signup";
import NotFound from "./components/Notfound";
import { Toaster } from "react-hot-toast";
import { AdminRoute, PrivateRoute } from "./utils/authenticator";

function App() {
  return (
    <div>
      <Toaster />

      <Router>
        <Routes>
          <Route
            path="/signup"
            element={
              <AdminRoute>
                <Signup />
              </AdminRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AdminRoute>
                <TransportDashboardComponent />
              </AdminRoute>
            }
          />
          <Route
            path="/ship"
            element={
              <PrivateRoute>
                <ShipmentDashboardComponent />
              </PrivateRoute>
            }
          />

          <Route
            path="/truck-info"
            element={
              <PrivateRoute>
                <TruckDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/driver"
            element={
              <PrivateRoute>
                <DriverManagementComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/client"
            element={
              <PrivateRoute>
                <EnhancedClientManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <PrivateRoute>
                <EnhancedBillingPageComponent />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
