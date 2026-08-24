import { Link } from "react-router-dom";

import { 
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card"


function TripCard({id, title, startDate, endDate, coverImage}) {
    console.log("TripCard props received:", { id, title, startDate, endDate, coverImage });

  

  return (
    <Link to={`/trips/${id}`} className="no-underline block">

     <Card className="relative mx-auto w-full max-w-sm pt-0">
      
      <img
        src={coverImage}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {startDate} - {endDate}
        </CardDescription>
      </CardHeader>
     
    </Card>
    
    </Link>
   
  )
}

export default TripCard