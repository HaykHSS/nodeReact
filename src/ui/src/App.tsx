import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthRoute from "./components/authRoute/AuthRoute";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LoginRegister from "./pages/LoginRegister";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/employee" element={<EmployeePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
