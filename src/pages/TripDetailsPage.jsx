import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"


import NavbarTripDetails from "@/components/TripDetailsPageComponents/NavbarTripDetails"
import DaysCard from "@/components/TripDetailsPageComponents/DaysCard"
import AccomodationCard from "@/components/accommodationComponents/AccomodationCard"
import CreateAccModal from "@/components/accommodationComponents/CreateAccModal"

//Shadcn
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

//icons
import { PlaneTakeoff, PlaneLanding } from "lucide-react"

function TripDetailsPage({ allTrips, fetchTrips }) {
  const { tripId } = useParams()
  const trip = allTrips.find((trip) => trip.id === tripId)

  //states
  const [allAccTrip, setAllAccTrip] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate() // 1. Added useNavigate hook


  const fetchAccTrip = async () => {
    setIsLoading(true)


    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/trips/${tripId}?_embed=accommodations`)
      
      
      setAllAccTrip(response.data.accommodations || [])
    } catch (error) {
      console.error("Error fetching accommodations per trip:", error)

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
    fetchAccTrip()
  }, [tripId])



  return (
    <div className="min-h-screen w-full">
      {/* Main Container*/}
      <main className="flex min-h-screen w-full flex-col lg:flex-row">
        <div
          id="left-panel"
          className="relative w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:self-start"
        >
          <NavbarTripDetails trip={trip} fetchTrips={fetchTrips} />

          <header
            id="trip-hero"
            className="relative min-h-[60vh] w-full bg-cover bg-center lg:h-screen lg:min-h-0"
            style={{ backgroundImage: `url(${trip?.coverImage})` }}
          >
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-2 border-t border-t-[rgba(255,255,255,0.36)] bg-[rgba(25,36,58,0.39)] px-[5vw] py-5 text-white backdrop-blur-[4.5px] lg:px-8 lg:py-8">
              <h1 className="text-2xl font-semibold">{trip?.title}</h1>
              <div>
                {trip?.startDate} - {trip?.endDate}
              </div>
              <div className="flex flex-wrap gap-2">
                {trip?.departureFlight && (
                  <div className="flex h-6.25 w-fit flex-row items-center justify-start gap-1.5 rounded-[6px] border-[0.5px] border-white/20 bg-white/30 px-2.25 py-1.25 text-white">
                    <PlaneTakeoff className="size-4! shrink-0" />
                    <span className="text-sm">{trip.departureFlight}</span>
                  </div>
                )}
                {trip?.returnFlight && (
                  <div className="flex h-6.25 w-fit flex-row items-center justify-start gap-1.5 rounded-[6px] border-[0.5px] border-white/20 bg-white/30 px-2.25 py-1.25 text-white">
                    <PlaneLanding className="size-4! shrink-0" />
                    <span className="text-sm">{trip.returnFlight}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Future left-panel content goes below the header. */}
        </div>

        {/* right-panel */}

        <div id="right-panel" className="w-full lg:w-1/2">
          <Tabs defaultValue="itinerary" className="w-full">
            <div className="sticky top-[72px] z-40 bg-white px-[5vw] py-4 lg:top-0">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              </TabsList>
            </div>

            {/* Itinerary Tab */}
            <TabsContent
              value="itinerary"
              className="w-full px-[5vw] py-4 pt-4"
            >
              <div className="w-full">
                {/* Your DaysCard list goes here */}

                <div id="headerTab">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Itinerary
                  </h1>

                  <p className="text py-1 text-muted-foreground">
                    {trip?.startDate} - {trip?.endDate}
                  </p>
                </div>

                <div className="flex w-full flex-col items-stretch gap-6 py-5">
                  {trip?.days?.map((day) => (
                    <DaysCard
                      key={`${trip.id}-${day.date}`}
                      trip={trip}
                      day={day}
                      fetchTrips={fetchTrips}
                    ></DaysCard>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Accommodation Tab */}
            <TabsContent
              value="accommodation"
              className="w-full px-[5vw] py-4 pt-4"
            >
              <div className="w-full">
                {/* Accommodation content goes here */}

                <div id="headerTab">

                  <div className="flex flex-row w-full items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                      Accommodation
                    </h1>

                    <CreateAccModal
                    fetchAccTrip={fetchAccTrip}
                    tripId={tripId}></CreateAccModal>

                    
                  </div>

              
                </div>

                


                 <div className="flex w-full flex-col items-stretch gap-6 py-5">
                  {allAccTrip.map((acc) => (
                    <AccomodationCard
                      key={acc.id}
                      accommodation={acc}
                      allAccTrip={allAccTrip}
                      trip={trip}
                      fetchAccTrip={fetchAccTrip}
                      tripId={tripId}
              
                    ></AccomodationCard>
                  ))}
                </div>

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default TripDetailsPage
