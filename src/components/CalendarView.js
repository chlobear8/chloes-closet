import Calendar from 'react-calendar';
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Avatar from './Avatar';

function DateBlock({ date, image }) {
  const [newAvatar, setNewAvatar] = useState({ baseImage: '', images: []});

  return (
    <React.Fragment>
      <div className ="date-block">
        <span classname="date">{date}</span>
        <img src={image} alt="Date" className="image" />
      </div>
      <Avatar
        articles={[]}
        lastWorn= ""
        setNewAvatar={newAvatar} />
    </React.Fragment>
  );
}

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [newAvatar, setNewAvatar] = useState({ baseImage: '', images: []});
  const calendarData = [{ date: date, image: newAvatar.images[0] }];
  
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