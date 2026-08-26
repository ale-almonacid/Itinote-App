import React from "react"
import { useEffect } from "react"

import { useState } from "react"
import axios from "axios"
import {eachDayOfInterval, format } from "date-fns"

//my components
import DatePickerWithRange from "@/components/HomePage-Components/DatePickerWithRange.jsx"

// Shadcn Icons

import { PenLine } from "lucide-react"

// Shadcn UI Imports
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function EditTripModal({ trip, fetchTrips }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [departureFlight, setDepartureFlight] = useState("")
  const [returnFlight, setReturnFlight] = useState("")
  const [coverImage, setCoverImage] = useState("")
 

  // Single date range object state
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  })

  // Default fallback image URL for testing
  const defaultImage =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"

  //useEffect //to get the existing information in the fields
  useEffect(() => {
    if (trip) {
      setTitle(trip.title || "")
      setDepartureFlight(trip.departureFlight || "")
      setReturnFlight(trip.returnFlight || "")
      setCoverImage(trip.coverImage || defaultImage)
      setDate({
        from: trip.startDate ? new Date(trip.startDate) : undefined,
        to: trip.endDate ? new Date(trip.endDate) : undefined,
      })
    }
  }, [trip, open])

  //helper function to update days

  function updateTripDays(from, to, existingDays = []) {
    if (!from || !to) {
      return []
    }

    const dates = eachDayOfInterval({
      start: from,
      end: to,
    })

    return dates.map((day, index) => {
      const formattedDate = format(day, "yyyy-MM-dd")
      let dayType = "Default"

      if (index === 0) {
        dayType = "Arrival day"
      } else if (index === dates.length - 1) {
        dayType = "Departure day"
      }

      const existingDay = existingDays.find((d) => d.date === formattedDate)

      if (existingDay) {
        // Keep existing notes and fields, but update the day type
        return {
          ...existingDay,
          type: dayType,
        }
      }

      return {
        date: format(day, "yyyy-MM-dd"),
        type: dayType,
        transitField: "",
        accommodationId: "",
        notes: "",
      }
    })
  }

  //functions

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      // Generate/re-align days array while keeping existing notes
      const updatedDays = updateTripDays(date.from, date.to, trip?.days || [])

      const body = {
        ...trip,
        title,
        startDate: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        endDate: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        departureFlight,
        returnFlight,
        coverImage: coverImage || defaultImage,
        days: updatedDays,
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/trips/${trip.id}`,
        body
      )

      setOpen(false)
      if (fetchTrips) fetchTrips()
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Edit trip">
          <PenLine />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Edit trip
              </span>
            </DialogTitle>
            <DialogDescription>
              Make some chnages to you trip.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Trip to Greece"
              />
            </Field>

            <DatePickerWithRange
              date={date}
              setDate={setDate}
            ></DatePickerWithRange>

            <Field>
              <Label htmlFor="Departure-flight">✈️ Departure flight</Label>
              <Input
                id="Departure-flight"
                type="text"
                name="Departure-flight"
                value={departureFlight}
                onChange={(e) => setDepartureFlight(e.target.value)}
                placeholder="e.g AS234 | 7:40am - 11:35am"
              />
            </Field>
            <Field>
              <Label htmlFor="return-Flight">✈️ Return flight</Label>
              <Input
                id="return-Flight"
                name="returnFlight"
                value={returnFlight}
                onChange={(e) => setReturnFlight(e.target.value)}
                placeholder="e.g AS234 | 7:40am - 11:35am"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTripModal
