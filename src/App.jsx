import { MemoryRouter } from "react-router-dom"
import Login from "./pages/Login"
import Users from "./pages/Users"
import Router from "./Router"

function App() {


  return (
    <MemoryRouter>
      <Router />
    </MemoryRouter>

  )
}

export default App
