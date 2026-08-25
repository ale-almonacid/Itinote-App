import React from 'react'

//Shadcn 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

function DaysCard({key, date, type, transitField, accommodationId, notes}) {
  return (
     <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="!text-[20px] font-semibold tracking-tight text-foreground">{date}</CardTitle>
        <CardDescription>
          This card uses the small size variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea></Textarea>
        
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DaysCard