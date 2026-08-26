import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

function AccomodationCard({ accommodation, allAccTrip, trip }) {
  const [editedNotes, setEditedNotes] = useState(accommodation.notes || "")
  const [isSaving, setIsSaving] = useState(false)


  async function updateTripAcc(updatedAcc) {

    if(!trip?.id)return
    setIsSaving(true)

    
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/trips/${trip.id}`, {
        ...trip,
        accommodations: updatedAcc,
      })
    } catch (error) {
      console.error("Could not save accommodation details:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Save notes on blur

  function handleNotesBlur() {
    const updatedAcc = allAccTrip.map((currentAcc) =>
      currentAcc.id === accommodation.id
        ? { ...currentAcc, notes: editedNotes }
        : currentAcc
    )
    updateTripAcc(updatedAcc)
  }




  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <CardDescription>{accommodation?.city}</CardDescription>
        <CardTitle>{accommodation?.name}</CardTitle>

        <p>{accommodation?.address}</p>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div>
          <label>Stay</label>
          <p>
            {accommodation?.checkInDate} - {accommodation?.checkOutDate}
          </p>
        </div>

        <div id="checkTimeWrapper" className="flex flex-row gap-7">
          <div>
            <label>Check-In</label>
            <p>{accommodation?.checkInTime}</p>
          </div>

          <div>
            <label>Check-Out</label>
            <p>{accommodation?.checkOutTime}</p>
          </div>
        </div>

         <Textarea
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
          onBlur={handleNotesBlur}
          placeholder="Add notes..."
          disabled={isSaving}
        />

      </CardContent>
    </Card>
  )
}

export default AccomodationCard
