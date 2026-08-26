import { useState, useEffect } from "react"
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

import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function EditAccModal({ accommodation, fetchAccTrip }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [checkInTime, setCheckInTime] = useState("")
  const [checkOutTime, setCheckOutTime] = useState("")
  const [dateError, setDateError] = useState("")

  // Single date range object state
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  })

  // Prefill the form with this accommodation's current data whenever the
  // dialog is opened (or the underlying data changes while it's open).
  useEffect(() => {
    if (!open || !accommodation) return

    setName(accommodation.name || "")
    setAddress(accommodation.address || "")
    setCity(accommodation.city || "")
    setCheckInTime(accommodation.checkInTime || "")
    setCheckOutTime(accommodation.checkOutTime || "")
    setDate({
      from: accommodation.checkInDate
        ? new Date(accommodation.checkInDate)
        : undefined,
      to: accommodation.checkOutDate
        ? new Date(accommodation.checkOutDate)
        : undefined,
    })
    setDateError("")
  }, [open, accommodation])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!date?.from || !date?.to) {
      setDateError("Please select a check-in and check-out date.")
      return
    }
    setDateError("")

    try {
      const body = {
        name,
        address,
        city,
        checkInDate: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        checkOutDate: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        checkInTime,
        checkOutTime,
      }

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/accommodations/${accommodation.id}`,
        body
      )

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
        <Button variant="outline" size="icon" aria-label="Edit accommodation">
          <PenLine />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
                Edit Accommodation
              </span>
            </DialogTitle>
            <DialogDescription>
              Update the details for this accommodation
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
                required
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
            <FieldError errors={dateError ? [{ message: dateError }] : []} />

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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditAccModal
