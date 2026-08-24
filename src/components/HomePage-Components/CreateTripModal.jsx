//my components
import DatePickerWithRange from './DatePickerWithRange';


// Shadcn Icons
import { Plus } from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function CreateTripModal() {

    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
  };


  return (
    <Dialog>
      <form onSubmit={handleSubmit}>

        <DialogTrigger asChild>
        <Button size="icon" aria-label="Create a new trip">
        <Plus />
         </Button>
        </DialogTrigger>


        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle><h1 className="text-[1.3rem] font-semibold tracking-tight text-foreground">Create new trip</h1></DialogTitle>
            <DialogDescription>
              Start planning your next adventure. Add your stay dates and a few details to get your trip underway.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" defaultValue="e.g Trip to greece" />
            </Field>

            <DatePickerWithRange></DatePickerWithRange>


            <Field>
              <Label htmlFor="username-1">✈️ Departure flight</Label>
              <Input id="username-1" name="username" defaultValue="e.g AS234 | 7:40am - 11:35am" />
            </Field>
            <Field>
              <Label htmlFor="username-1">✈️ Return flight</Label>
              <Input id="username-1" name="username" defaultValue="e.g AS234 | 7:40am - 11:35am" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateTripModal