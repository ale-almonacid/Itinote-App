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
import { Button } from "@/components/ui/button"
import DeleteAccAlert from "./DeleteAccAlert"
import EditAccModal from "./EditAccModal"

import { Trash2 } from "lucide-react"

function AccomodationCard({ accommodation, trip, fetchAccTrip }) {
  const [editedNotes, setEditedNotes] = useState(accommodation.notes || "")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setEditedNotes(accommodation?.notes || "")
  }, [accommodation?.notes])

  async function handleNotesBlur(updatedAcc) {
    if (editedNotes === (accommodation?.notes || "")) return
    setIsSaving(true)

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/accommodations/${accommodation.id}`,
        { notes: editedNotes }
      )

      if (fetchAccTrip) {
        //Refresh
        await fetchAccTrip()
      }
    } catch (error) {
      console.error("Could not save accommodation details:", error)
    } finally {
      setIsSaving(false)
    }
  }



  return (
    <Card size="sm" className="w-full">
      <CardHeader className="relative">
        <div className="absolute top-0 right-3 flex flex-wrap items-center gap-2 md:flex-row">
    

          <EditAccModal
            accommodation={accommodation}
            fetchAccTrip={fetchAccTrip}
          />

          <DeleteAccAlert
            accommodationId={accommodation.id}
            fetchAccTrip={fetchAccTrip}
          />
        </div>

        <label className=" text-[10px]font-normal leading-3
         tracking-[0.03em] uppercase text-[#6B7588]">{accommodation?.city}</label>
        <CardTitle className="text-lg font-semibold">{accommodation?.name}</CardTitle>

        <p>{accommodation?.address}</p>

        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div>
          <label className="text-[10px] font-normal leading-3
         tracking-[0.03em] uppercase text-[#6B7588]">Stay</label>
          <p>
            {accommodation?.checkInDate} - {accommodation?.checkOutDate}
          </p>
        </div>

        <div id="checkTimeWrapper" className="flex flex-row gap-7">
          <div>
            <label className="text-[10px] font-normal leading-3
         tracking-[0.03em] uppercase text-[#6B7588]">Check-In</label>
            <p>{accommodation?.checkInTime}</p>
          </div>

          <div>
            <label className="text-[10px] font-normal leading-3
         tracking-[0.03em] uppercase text-[#6B7588]">Check-Out</label>
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
