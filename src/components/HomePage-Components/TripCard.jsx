import { Link } from "react-router-dom";



import { 
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card"


function TripCard({id, title, startDate, endDate, coverImage}) {
   

  

  return (
    <Link to={`/trips/${id}`} className="no-underline block">

     <Card className="relative w-full pt-0 md:mx-auto md:max-w-sm">
      
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