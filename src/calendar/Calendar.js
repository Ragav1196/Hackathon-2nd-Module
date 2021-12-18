import { useState } from "react";
import Calendar from "react-calendar";

export function Calendarx() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
