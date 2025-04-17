import { BrowserRouter } from 'react-router-dom'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import AppMain from './components/layout/AppMain'
import LayoutCorners from './components/layout/LayoutCorners'
import AppRoutes from './router'
import StoreProvider from './providers/StoreProvider'

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <LayoutCorners />
        <AppRoutes />
        <AppHeader />
        <AppMain />
        <AppFooter />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
