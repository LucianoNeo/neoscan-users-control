import { MemoryRouter } from "react-router-dom"
import Router from "./Router"
import { AuthProvider } from "./Context/AuthContext"


function App() {


  return (
    <AuthProvider>
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    </AuthProvider>

  )
}

export default App
