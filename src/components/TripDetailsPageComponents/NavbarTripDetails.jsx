import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//components
import EditTripModal from "./EditTripModal"
import DeleteTripAlert from "./DeleteTripAlert";

//shadcn components 
import { Button } from "@/components/ui/button"


//icons
import { ArrowLeft } from "lucide-react"


function NavbarTripDetails({ trip, fetchTrips }) {
  const [isPastHero, setIsPastHero] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const hero = document.getElementById("trip-hero")

    if (!hero) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`${isPastHero ? "bg-white text-foreground shadow-sm" : "bg-transparent"} fixed inset-x-0 top-0 z-50 flex justify-between px-[5vw] py-5 transition-colors lg:absolute lg:bg-transparent lg:shadow-none`}
    >
      <Button variant="outline" size="icon" onClick={() => navigate("/")} >
        <ArrowLeft/>
      </Button>

      <div className="flex flex-wrap items-center gap-2 md:flex-row">

        <DeleteTripAlert trip={trip} fetchTrips={fetchTrips} ></DeleteTripAlert>

        {/* <Button variant="outline" size="icon" aria-label="Submit">
          <Trash2 />
        </Button> */}

        <EditTripModal trip={trip} fetchTrips={fetchTrips} ></EditTripModal>

        
      </div>
    </nav>
  )
}

export default NavbarTripDetails
