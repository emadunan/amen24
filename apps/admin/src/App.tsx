import { BrowserRouter } from 'react-router-dom'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import LayoutCorners from './components/layout/LayoutCorners'
import AppRoutes from './router'
import StoreProvider from './providers/StoreProvider'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <LayoutCorners />
        <AppHeader />
        <AppRoutes />
        <AppFooter />
        <ToastContainer toastStyle={{ fontFamily: "amiri, serif" }} />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App;
