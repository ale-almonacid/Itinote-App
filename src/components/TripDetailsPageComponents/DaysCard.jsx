import { useState } from "react"
import axios from "axios"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge.jsx"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"



function DaysCard({ trip, day }) {
  const isArrivalDay = day.type === "Arrival day"
  const isDepartureDay = day.type === "Departure day"
  const isDefaultDay = day.type === "Default"

  const [isTransportDay, setIsTransportDay] = useState(
    Boolean(day.transitField)
  )
  const [transportDetails, setTransportDetails] = useState(
    day.transitField || ""
  )

  const [editedNotes, setEditedNotes] = useState(day.notes || "")
  const [isSaving, setIsSaving] = useState(false)

  async function handleNotesBlur() {
    setIsSaving(true)

    try {
      const updatedDays = trip.days.map((currentDay) => {
        if (currentDay.date === day.date) {
          return {
            ...currentDay,
            notes: editedNotes,
          }
        }

        return currentDay
      })

      await axios.put(`${import.meta.env.VITE_API_URL}/trips/${trip.id}`, {
        ...trip,
        days: updatedDays,
      })
    } catch (error) {
      console.error("Could not save notes:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card size="sm" className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
            <CardTitle className="text-[18px]! font-semibold">{day.date}</CardTitle> 

            {isArrivalDay && <Badge variant="default">Arrival day</Badge>}

            {isDepartureDay && <Badge variant="secondary">Departure day</Badge>}

        </div>
       


        {isDefaultDay && (
          <>
            <Toggle
              variant="outline"
              size="sm"
              pressed={isTransportDay}
              onPressedChange={setIsTransportDay}
            >
              Transport
            </Toggle>

            {isTransportDay && (
              <Input
                value={transportDetails}
                onChange={(event) => setTransportDetails(event.target.value)}
                placeholder="Add transport details..."
              />
            )}
          </>
        )}
      </CardHeader>

      <CardContent>
        <Textarea
          value={editedNotes}
          onChange={(event) => setEditedNotes(event.target.value)}
          onBlur={handleNotesBlur}
          placeholder="Add notes..."
          disabled={isSaving}
        />
      </CardContent>
    </Card>
  )
}

export default DaysCard
