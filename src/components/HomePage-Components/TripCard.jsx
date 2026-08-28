import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns"



import { 
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card"


function TripCard({id, title, startDate, endDate, coverImage}) {
   
    // Helper to safely format ISO strings ("2026-08-13" -> "13 Aug 2026")
  const formatDate = (dateString) => {
    if (!dateString) return ""
    return format(parseISO(dateString), "d MMM yyyy")
  }
  

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
          {formatDate(startDate)} - {formatDate(endDate)}
        </CardDescription>
      </CardHeader>
     
    </Card>
    
    </Link>
   
  )
}

export default TripCard