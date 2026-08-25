import React from "react"
import { useEffect } from "react"

import { useState } from "react"
import axios from "axios"
import { format } from "date-fns"

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
  const [days, setDays] = useState(0)

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
      setDays(trip.days || 0)
      setDate({
        from: trip.startDate ? new Date(trip.startDate) : undefined,
        to: trip.endDate ? new Date(trip.endDate) : undefined,
      })
    }
  }, [trip, open])

  //functions

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = {
        title,
        startDate: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        endDate: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        departureFlight,
        returnFlight,
        coverImage: defaultImage,
        days,
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
