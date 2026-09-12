import { Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./layouts/pages/Home"
import About from "./layouts/pages/About"
import Tasks from "./layouts/pages/Tasks"

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  )
}

export default App
