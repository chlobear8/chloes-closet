import Calendar from 'react-calendar';
import { useState } from 'react';

function CalendarView() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='calendar'>
      <div className = 'calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className = 'text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default CalendarView;