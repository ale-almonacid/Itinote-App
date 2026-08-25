import { useParams } from "react-router-dom"

import NavbarTripDetails from "@/components/TripDetailsPageComponents/NavbarTripDetails"
import DaysCard from "@/components/TripDetailsPageComponents/DaysCard"

//Shadcn
import { Badge } from "@/components/ui/badge"
import { PlaneTakeoff, PlaneLanding } from "lucide-react"

function TripDetailsPage({ allTrips, fetchTrips }) {
  const { tripId } = useParams()
  const trip = allTrips.find((trip) => trip.id === tripId)
  

  return (
    <div>
      <NavbarTripDetails
        trip={trip}
        fetchTrips={fetchTrips}
      ></NavbarTripDetails>
      <header
        className="relative min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${trip?.coverImage})` }}
      >
        <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-2 border-t border-t-[rgba(255,255,255,0.36)] bg-[rgba(22,34,56,0.32)] px-[5vw] py-5 text-white backdrop-blur-[4.5px]">
          <h1 className="text-2xl font-semibold">{trip?.title}</h1>
          <div>
            {trip?.startDate} - {trip?.endDate}
          </div>
          <div className="flex gap-2">
            <Badge>{trip?.departureFlight}</Badge>
            <Badge>{trip?.returnFlight}</Badge>
          </div>
        </div>
      </header>

      <div className="px-[5vw] py-5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Itinerary
        </h1>
        <p className="text py-1 text-muted-foreground">
          {trip?.startDate} - {trip?.endDate}
        </p>

        <div className="flex flex-col gap-6">
          {trip?.days?.map((day) => (
            <DaysCard 
            key={`${trip.id}-${day.date}`}
            date={day.date}
            type={day.type}
            transitField={day.transitField}
            accommodationId={day.accommodationId}
            notes={day.notes}
            ></DaysCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TripDetailsPage
