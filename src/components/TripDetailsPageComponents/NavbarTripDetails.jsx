import React from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
//components
import EditTripModal from "./EditTripModal"
import DeleteTripAlert from "./DeleteTripAlert";

//shadcn components 
import { Button } from "@/components/ui/button"

//icons
import { ArrowLeft } from "lucide-react"
import { Trash2 } from "lucide-react"


function NavbarTripDetails({ trip, fetchTrips }) {

  const navigate = useNavigate() // this is for navigate (to be used as a function)

  return (
    <nav className="fixed inset-x-0 top-0 z-2 flex justify-between border-b border-b-[rgba(202,204,221,0.2)] px-[5vw] py-5">
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
