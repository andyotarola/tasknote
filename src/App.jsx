import { Provider } from "react-redux"
import { Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/DashboardLayout"
import HomeLayout from "./layouts/home/HomeLayout"
import TypeTodo from "./pages/dashboard/TypeTodo"
import Main from "./pages/dashboard/Main"
import Home from "./pages/home/Home"
import Login from "./pages/home/Login"
import Signup from "./pages/home/Signup"
import ProtectedRoute from "./routes/ProtectedRoute"
import store from './store'
import PasswordRecovery from "./pages/home/PasswordRecovery"
import RecoverPassword from "./pages/home/RecoverPassword"
import EditProfile from "./pages/dashboard/EditProfile"
import PageNotFound from "./pages/home/PageNotFound"

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<Home />} />
            <Route path="iniciar-sesion" element={<Login />} />
            <Route path="registro" element={<Signup />} />
            <Route path="recuperacion" element={<PasswordRecovery />} />
            <Route path="recuperar" element={<RecoverPassword />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="" element={<Main />} />
            <Route path="tipos-tareas" element={<TypeTodo />} />
            <Route path="editar-perfil" element={<EditProfile />}/>
          </Route>
          
          <Route path="*"  element={<PageNotFound />} />
          
        </Routes>
      </Provider>
    </>
  )
}

export default App
