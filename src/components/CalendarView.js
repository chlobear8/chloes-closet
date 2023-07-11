import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';


const calendarData = [{ date: new Date(`{dateChosen}`), image: (`{image}`)}];

function DateBlock({ date, image }) {
  return (
    <div className ="date-block">
      <span classname="date">{date}</span>
      <img src={image} alt="Date" className="image" />
    </div>
  );
}

function CalendarView() {
  const [date, setDate] = useState(new Date());
  return (
    <div className='calendar'>
      <div className = 'calendar-container'>
        <Calendar onChange={setDate} value={date} />
        {calendarData.map((data) => (
          <DateBlock key ={data.date} date={data.date} image={data.image} />
        ))}
      </div>
      <p className = 'text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default CalendarView;