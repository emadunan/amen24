import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Members from "../pages/Members"
import VerseGroups from "../pages/VerseGroups"
import Featured from "../pages/Featured"
import Glossary from "../pages/Glossary"
import AppMain from "../components/layout/AppMain"
import Login from "../pages/Login"
import ProtectedRoute from "../components/layout/ProtectedRoute"


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppMain />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/members' element={<Members />} />
          <Route path='/verse-groups' element={<VerseGroups />} />
          <Route path='/featured' element={<Featured />} />
          <Route path='/glossary' element={<Glossary />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes