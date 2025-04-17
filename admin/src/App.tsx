import { BrowserRouter } from 'react-router-dom'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import AppMain from './components/layout/AppMain'
import LayoutCorners from './components/layout/LayoutCorners'
import AppRoutes from './router'

function App() {

  return (
    <BrowserRouter>
      <LayoutCorners />
      <AppRoutes />
      <AppHeader />
      <AppMain />
      <AppFooter />
    </BrowserRouter>
  )
}

export default App
