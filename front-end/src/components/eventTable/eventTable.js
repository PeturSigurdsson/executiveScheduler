import React, { Component } from 'react';
// import Event from '../event';
import { Link } from 'react-router-dom';

import './eventTable.css';

class EventTable extends Component {

  constructor(props) {
    super(props);
    const { data } = props;

    this.state = { data };
  }

  generateTable() {
    const { data } = this.state;

    const today = new Date();
    const weekDay = today.getDay();
    const millisDay = 24 * 60 * 60 * 1000;

    const rows = [];

    for (let i = 0; i < 24; i++) {
      const byHour = data.filter(event => {
        const e = new Date(event.startDate);
        return (
          e.getHours() === i
        );
      });

      const row = [];

      for (let j = 0; j < 7; j++) {
        const newDay = new Date(today.getTime() - (millisDay * (weekDay - j)));
        const eventsToday = byHour.filter(event => {
          const e = new Date(event.startDate);
          return (
            e.getDate() === newDay.getDate() &&
            e.getMonth() === newDay.getMonth() &&
            e.getFullYear() === newDay.getFullYear()
          );
        });

        row.push(eventsToday)
      }

      rows.push(row)
    }

    return rows;
  }

  getDayHeaders() {
    const names = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];

    const dayHeaders = [];
    let today = new Date();
    const weekDay = today.getDay();
    const millisDay = 24 * 60 * 60 * 1000;

    for (let i = 0; i < 7; i++) {
      const newDay = new Date(today.getTime() - (millisDay * (weekDay - i)));
      dayHeaders.push(`${names[i]} ${newDay.getDate()}.${newDay.getMonth() + 1}.${newDay.getFullYear()}`);
    }

    return dayHeaders;
  }

  render(){
    const table = this.generateTable();
    const days = this.getDayHeaders();

    const hours = [];

    for (let i = 0; i < 24; i++) {
      if (i < 10) hours.push(`0${i}:00`);
      else hours.push(`${i}:00`);
    }

    return (
      <table>
        <thead>
          <tr>
            <td></td>
            {days.map((td, i) =>
              <td className='tableHeader' key={i}> {td} </td>
            )}
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => {
            return (
              <tr className='tableRow' key={i}>
                <td className='tableCell tableHour'> {hours[i]} </td>
                {row.map((cell, j) => {
                  return (
                    <td key={j} className='tableCell'>
                      {cell.map(event =>
                        <Link key={event.id} to={`/event/${event.id}`}> {event.title} </Link>
                      )}
                    </td>
                  )
                })}
              </tr>
            );
          })}
        </tbody>
        </table>
      );
    }
  }

  export default EventTable;
