import { useState } from "react"
import axios from "axios"
import { eachDayOfInterval, format } from "date-fns"

//my components
import DatePickerWithRange from "./DatePickerWithRange"

// Shadcn Icons
import { Plus } from "lucide-react"

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

function CreateTripModal({ fetchTrips }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [departureFlight, setDepartureFlight] = useState("")
  const [returnFlight, setReturnFlight] = useState("")

  // Single date range object state
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  })

  // Default fallback image URL for testing
  const defaultImage =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"

  //helper function

  function createTripDays(from, to) {
    if (!from || !to) {
      return []
    }

    const dates = eachDayOfInterval({
      start: from,
      end: to,
    })

    return dates.map((day, index) => {
      let dayType = "Default"

      if (index === 0) {
        dayType = "Arrival day"
      } else if (index === dates.length - 1) {
        dayType = "Departure day"
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const generatedDays = createTripDays(date.from, date.to)

      const body = {
        id: `trip-${Date.now()}`,
        title,
        startDate: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        endDate: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        departureFlight,
        returnFlight,
        coverImage: defaultImage,
        days: generatedDays,
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/trips`, body)

      setTitle("")
      setDepartureFlight("")
      setReturnFlight("")
      setDate({ from: undefined, to: undefined })
      setOpen(false)

      if (fetchTrips) {
        await fetchTrips()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" aria-label="Create a new trip">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Create new trip
              </span>
            </DialogTitle>
            <DialogDescription>
              Start planning your next adventure. Add your stay dates and a few
              details to get your trip underway.
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTripModal
