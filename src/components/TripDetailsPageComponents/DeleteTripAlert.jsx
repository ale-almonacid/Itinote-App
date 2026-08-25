import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function DeleteTripAlert({trip, fetchTrips}) {

    const navigate = useNavigate()

    const deleteProject = async() => {
    try {
      // call the API here to delete one project...

      await axios.delete(`${import.meta.env.VITE_API_URL}/trips/${trip.id}`)
      await fetchTrips() // Add this so that it updates the list before navigating back 
      navigate("/")
      
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }; 





  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Submit">
          <Trash2Icon />
        </Button>
        
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete trip?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this trip from the database, this action can't be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={deleteProject} >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTripAlert
