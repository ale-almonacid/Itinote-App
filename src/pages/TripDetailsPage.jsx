import { useParams } from "react-router-dom"

import NavbarTripDetails from "@/components/TripDetailsPageComponents/NavbarTripDetails"

function TripDetailsPage({ allTrips, fetchTrips }) {

  const { tripId } = useParams()
  const trip = allTrips.find((trip) => trip.id === tripId)


  return (
    <div>
      <NavbarTripDetails trip={trip} fetchTrips={fetchTrips}></NavbarTripDetails>
      <header className="relative min-h-[70vh] bg-cover bg-center"
  style={{ backgroundImage: `url(${trip?.coverImage})` }} >

      </header>
    </div>
  )
}

export default TripDetailsPage