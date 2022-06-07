import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const ClientRoutes = [
  <>
    <Route key={1} element={<Restaurants />} path="/" />
    <Route key={2} element={<ConfirmEmail />} path="/confirm" />
    <Route key={3} element={<EditProfile />} path="/edit-profile" />
    <Route key={4} element={<Search />} path="/search" />
    <Route key={5} element={<Category />} path="/category/:slug" />
    <Route key={6} element={<Restaurant />} path="/restaurants/:id" />
  </>
]

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    )
  }
  return (
    <Router>
      <Header />
      <Routes>
        {data.me.role === "Client" && ClientRoutes}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  )
}