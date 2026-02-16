import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import CreateProduct from "./pages/CreateProduct";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import OrderManagement from "./pages/OrderManagement";
import EditProduct from "./pages/EditProduct";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <ProductManagement />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/create-product"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <CreateProduct />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <AdminProtectedRoute>
              <OrderManagement />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
