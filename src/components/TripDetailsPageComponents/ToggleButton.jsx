import React from "react"

//shadcn
import { Plus, Route } from "lucide-react"
import { Button } from "@/components/ui/button"

function ToggleButton({isActive, onToggle}) {

    if (isActive) {
    return (
      <Button
        type="button"
        size="sm"
        variant="ghost" // 👈 Change active background/color variant here
        style={{
          backgroundColor: "rgba(74, 178, 0, 0.1)", // 👈 Custom green background
          borderRadius: "6px",                      // 👈 Custom border radius
          padding: "4px 7px",                       // 👈 Custom padding
          color: "#4AB200",                          // 👈 Text and icon color
        }}
        className="h-7 gap-1.5 px-2.5 text-xs " // 👈 Add extra active styles here
        onClick={() => onToggle(false)}
      >
        <Route className="h-3.5 w-3.5" />
        <span>Transit Day</span>
      </Button>
    )
    }

    // 2. INACTIVE STATE (Looks like a round + button with no text)
  return (
    <Button
      type="button"
      size="sm"
      variant="outline" // 👈 Change inactive background/border variant here
      className="h-7 w-7 p-0 rounded-6px" // 👈 Add extra inactive styles here (rounded-full makes it circular)
      onClick={() => onToggle(true)}
    >
      <Plus className="h-4 w-4" />
    </Button>
  )

 
  
  
}

export default ToggleButton
