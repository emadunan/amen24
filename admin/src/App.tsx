import styles from './App.module.css'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import AppMain from './components/layout/AppMain'
import LayoutCorners from './components/layout/LayoutCorners'

function App() {

  return (
    <>
      <LayoutCorners />

      <AppHeader />
      <AppMain/>
      <AppFooter/>
    </>
  )
}

export default App
