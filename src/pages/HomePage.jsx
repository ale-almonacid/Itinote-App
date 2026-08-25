

//components
import TripCard from "@/components/HomePage-Components/TripCard"
import CreateTripModal from "@/components/HomePage-Components/CreateTripModal"
import NavbarHomePage from "@/components/HomePage-Components/NavbarHomePage"

//Shadcn

function HomePage({allTrips, fetchTrips, isLoading}) {
  
  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  return (
    <>
    <NavbarHomePage></NavbarHomePage>
      <div id="content" className="view px-[5vw]">
        <header className="flex w-full items-center justify-between py-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Journeys
            </h1>
            <p>Explore, plan and manage your upcoming adventures</p>
          </div>

          <CreateTripModal fetchTrips={fetchTrips}></CreateTripModal>
        </header>

        <div
          id="card-wrapper"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {allTrips.map((trip) => (
             <TripCard key={trip.id} {...trip} to={``}></TripCard>
          ))}

        </div>
      </div>
    </>
  )
}

export default HomePage
