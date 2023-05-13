import { Route, Routes } from "react-router-dom"
import Pages from "./Pages"
import AppSidebar from "./components/AppSidebar"

function App() {
  return (
    <div className="App">
      <AppSidebar />
      <Routes>
        <Route path="/" element={<Pages.Main />}/>
        <Route path="/items" element={<Pages.Items />}/>
        <Route path="/user-items" element={<Pages.UserItems />}/>
        <Route path="/auth" element={<Pages.Auth />}/>
      </Routes>
    </div>
  )
}

export default App
