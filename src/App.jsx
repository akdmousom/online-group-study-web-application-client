import { Outlet } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout"

function App() {


  return (
    <MainLayout>
      <Outlet></Outlet>
    </MainLayout>
  )
}

export default App
