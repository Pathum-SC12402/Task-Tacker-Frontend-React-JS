"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CustomCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="custom-calendar rounded-md border shadow items-center"/>
  )
}
