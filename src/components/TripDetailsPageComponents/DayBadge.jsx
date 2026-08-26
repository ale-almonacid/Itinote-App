import React from "react"
import { Badge } from "@/components/ui/badge"

function DayBadge({ label, icon: Icon }) {
  return (
    <Badge
      variant="ghost"
      style={{
        backgroundColor: "rgba(23, 92, 211, 0.1)", // Translucent blue background
        borderRadius: "6px",
        padding: "4px 7px",
        color: "#175CD3",                         // Blue text/icon color
      }}
      className="h-auto gap-1 text-xs border-0"
    >
      {Icon && <Icon className=" stroke-[#175CD3]" />}
      <span>{label}</span>
    </Badge>
  )
}

export default DayBadge