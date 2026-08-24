//React
import { Routes, Route } from "react-router-dom"

//Pages
import HomePage from "@/pages/HomePage"
import TripDetailsPage from "@/pages/TripDetailsPage"
import NotFoundPage from "@/pages/NotFoundPage"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips/:tripId" element={<TripDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
