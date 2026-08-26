import { useState, useEffect } from "react"
import axios from "axios"

// Components & UI
import ToggleButton from "./ToggleButton"
import DayBadge from "./DayBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

//icons
import { PlaneLanding, PlaneTakeoff } from "lucide-react"

function DaysCard({ trip, day, fetchTrips }) {
  // Day types based on backend values
  const isArrivalDay = day.type === "Arrival day"
  const isDepartureDay = day.type === "Departure day"

  // Local state initialized directly from props
  const [dayType, setDayType] = useState(day.type || "Default")
  const [transitField, setTransitField] = useState(day.transitField || "")
  const [editedNotes, setEditedNotes] = useState(day.notes || "")
  const [isSaving, setIsSaving] = useState(false)

  const isTransportDay = dayType === "Transit"
  const isDefaultDay = dayType === "Default" || dayType === "Transit"

  // Keep local state in sync when the trip is refreshed from the backend
  useEffect(() => {
    setDayType(day.type || "Default")
    setTransitField(day.transitField || "")
    setEditedNotes(day.notes || "")
  }, [day.type, day.transitField, day.notes])

  // Helper to update trip days array on the backend
  async function updateTripDays(updatedDays) {
    setIsSaving(true)
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/trips/${trip.id}`, {
        ...trip,
        days: updatedDays,
      })

      if (fetchTrips) {
        await fetchTrips()
      }
    } catch (error) {
      console.error("Could not save trip details:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Save notes on blur
  function handleNotesBlur() {
    if (editedNotes === (day.notes || "")) return

    const updatedDays = trip.days.map((currentDay) =>
      currentDay.date === day.date
        ? { ...currentDay, notes: editedNotes }
        : currentDay
    )
    updateTripDays(updatedDays)
  }

  // Toggle transport day and persist type change
  function handleToggleTransport(nextState) {
    const newType = nextState ? "Transit" : "Default"
    setDayType(newType)

    const updatedDays = trip.days.map((currentDay) =>
      currentDay.date === day.date
        ? {
            ...currentDay,
            type: newType,
            transitField: nextState ? transitField : "",
          }
        : currentDay
    )
    updateTripDays(updatedDays)
  }

  // Save transit input on blur
  function handleTransitBlur() {
    const updatedDays = trip.days.map((currentDay) =>
      currentDay.date === day.date
        ? { ...currentDay, transitField }
        : currentDay
    )
    updateTripDays(updatedDays)
  }

  return (
    <Card size="sm" className="w-full">
      <CardHeader className="gap-3">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-[18px] font-semibold">
            {day.date}
          </CardTitle>

          <div className="flex items-center gap-2">
            {isArrivalDay && (
              <DayBadge label="Arrival day" icon={PlaneLanding} />
            )}

            {isDepartureDay && (
              <DayBadge label="Departure day" icon={PlaneTakeoff} />
            )}

            {isDefaultDay && (
              <ToggleButton
                isActive={isTransportDay}
                onToggle={handleToggleTransport}
                disabled={isSaving}
              />
            )}
          </div>
        </div>

        {/* Transit Input directly under header row */}
        {isDefaultDay && isTransportDay && (
          <Input
            value={transitField}
            onChange={(e) => setTransitField(e.target.value)}
            onBlur={handleTransitBlur}
            placeholder="Add transport details..."
            disabled={isSaving}
            className="h-9 text-sm"
          />
        )}
      </CardHeader>

      <CardContent>
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

export default DaysCard
