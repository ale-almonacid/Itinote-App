

//components
import TripCard from "@/components/HomePage-Components/TripCard"
import CreateTripModal from "@/components/HomePage-Components/CreateTripModal"
import NavbarHomePage from "@/components/HomePage-Components/NavbarHomePage"
import Searchbar from "@/components/HomePage-Components/Searchbar"

//Shadcn

function HomePage({allTrips, fetchTrips, isLoading}) {
  
  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  return (
    <>
    <NavbarHomePage></NavbarHomePage>
      <div id="content" className="view px-[5vw]">
        <header className="relative flex w-full flex-wrap items-start gap-2 py-8 md:flex-nowrap md:items-center">

          <div className="order-1 pr-14 md:pr-0">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Journeys
            </h1>
            <p className="text text-muted-foreground py-0.5">Explore, plan and manage your upcoming adventures</p>
          </div>

          <div className="absolute top-8 right-0 md:static md:order-3">
            <CreateTripModal fetchTrips={fetchTrips}></CreateTripModal>
          </div>

          <div className="order-3 w-full md:order-2 md:ml-auto md:w-74">
            <Searchbar />
          </div>

        </header>

        <div
          id="card-wrapper"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {allTrips.map((trip) => (
             <TripCard className="w-full"
             key={trip.id} {...trip} to={``}></TripCard>
          ))}

        </div>
      </div>
    </>
  )
}

export default HomePage
