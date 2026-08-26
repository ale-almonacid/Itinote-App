//React
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

//Pages
import HomePage from "@/pages/HomePage"
import TripDetailsPage from "@/pages/TripDetailsPage"
import NotFoundPage from "@/pages/NotFoundPage"






export function App() {

  const [allTrips, setAllTrips] = useState([])
 
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate() // 1. Added useNavigate hook

  const fetchTrips = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/trips`)
      setAllTrips(response.data)
      

    } catch (error) {
      console.error("Error fetching trips:", error)

      //redirect to error
      if (error.response?.status === 404) {
        navigate("/not-found")
      } else {
        navigate("/error")
      }
    } finally {
      setIsLoading(false) // Runs on both success and error
    }

    
  }

  useEffect(() => {
    fetchTrips()
  }, [])


  



  return (
    <Routes>
      <Route path="/" element={<HomePage allTrips={allTrips} fetchTrips={fetchTrips} isLoading={isLoading} />} />
      <Route path="/trips/:tripId" element={<TripDetailsPage allTrips={allTrips} fetchTrips={fetchTrips}/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
