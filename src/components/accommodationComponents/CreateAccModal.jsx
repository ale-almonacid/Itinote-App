import React from "react"
import { useState } from "react"
import axios from "axios"
import { eachDayOfInterval, format } from "date-fns"

//my components
import DatePickerWithRange from "@/components/HomePage-Components/DatePickerWithRange.jsx"

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

function CreateAccModal({ tripId, fetchAccTrip }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [checkInTime, setCheckInTime] = useState("")
  const [checkOutTime, setCheckOutTime] = useState("")

  // Single date range object state
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = {
        tripId,
        name,
        address,
        city,
        checkInDate: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        checkOutDate: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        checkInTime,
        checkOutTime,
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/accommodations`,
        body
      )

      setName("")
      setAddress("")
      setCity("")
      setCheckInTime("")
      setCheckOutTime("")
      setDate({ from: undefined, to: undefined })
      setOpen(false)

      //  Trigger local refetch to re-render accommodation list
      if (fetchAccTrip) {
        await fetchAccTrip()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" aria-label="Create a new Accommodation">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
                Add Accommodation
              </span>
            </DialogTitle>
            <DialogDescription>
              Add a new entry for the accommodation
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Trip to Greece"
              />
            </Field>

            <Field>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Trip to Greece"
              />
            </Field>

            <Field>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Trip to Greece"
              />
            </Field>

            <DatePickerWithRange
              date={date}
              setDate={setDate}
            ></DatePickerWithRange>

            <div id="timefieldswrapper" className="flex flex-row gap-7">

            <Field className="w-32">
              <Label htmlFor="checkInTime">Check-in Time</Label>
              <Input
                type="time"
                id="checkInTime"
                value={checkInTime}
                placeholder="10:30:00"
                onChange={(e) => setCheckInTime(e.target.value)}
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>

            <Field className="w-32">
              <Label htmlFor="checkOutTime">Check-out Time</Label>
              <Input
                type="time"
                id="checkOutTime"
                value={checkOutTime}
                placeholder="10:30:00"
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"

              />
            </Field>

            </div>



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

export default CreateAccModal
