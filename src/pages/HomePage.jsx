import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

//components
import TripCard from "@/components/HomePage-Components/TripCard"
import CreateTripModal from "@/components/HomePage-Components/CreateTripModal"

//Shadcn 


function HomePage() {
  //states
  const [allTrips, setAllTrips] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //global constants
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTrips() {
      setIsLoading(true)

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/trips`
        )
        console.log("Raw API Response Data:", response.data.trips) // test API call
        setAllTrips(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        //redirect to error
        if (error.status && error.response.status === 404) {
          navigate("/not-found")
        } else {
          navigate("/error")
        }
      }
    }

    fetchTrips()
  }, [navigate])

  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  return (
    <>
      <div id="content" className="view px-[5vw]">
        <header className="flex w-full items-center justify-between py-[20px]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground" >Your Journeys</h1>
            <p>Explore, plan and manage your upcoming adventures</p>
          </div>

          
          <CreateTripModal></CreateTripModal>
          
        </header>

        <div
          id="card-wrapper"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {!isLoading ? (
            allTrips.map((trip) => {
              return <TripCard key={trip.id} {...trip} to={``}></TripCard>
            })
          ) : (
            <h3>loading...</h3>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
