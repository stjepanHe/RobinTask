import React from 'react';
import { User } from '../state/action-creators';

interface UserTableProps {
  users: User[] | null;
  selectedUser: number | undefined;
}



export const UserTable = ({ users, selectedUser }: UserTableProps) => {
  const filteredUsers = users !== null && selectedUser
    ? users.filter((user: any) => user.user_id === selectedUser)
    : users;

  const filterEventsByWorkingHours = (events: any, workingHours: any) => {

    const filteredEvents = events.filter((event: any) => {
      const eventStartTime = new Date(event.start);
      const eventEndTime = new Date(event.end);


      const eventStartTimeZone = eventStartTime.toLocaleString('en-US', {
        timeZone: workingHours.time_zone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const eventEndTimeZone = eventEndTime.toLocaleString('en-US', {
        timeZone: workingHours.time_zone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });


      return (
        eventStartTimeZone >= workingHours.start &&
        eventEndTimeZone <= workingHours.end

      );
    });

    return filteredEvents;
  };


  return (
    <table className="table is-bordered is-striped is-narrow is-hoverable transparent-table custom-width">
      <thead>
        <tr>
          <th id="user-name-header">User Name</th>
          <th id="working-hours-header">Working Hours</th>
          <th id="meeting-header">Meetings</th>
          <th id="time-header">Time</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers !== null &&
          filteredUsers.map((user: any) => {
            const eventsWithinWorkingHours = filterEventsByWorkingHours(
              user.events,
              user.working_hours
            );

            return (
              <tr key={user.user_id}>
                <td headers="user-name-header">{user.user_name}</td>
                <td headers="working-hours-header">{`${user.working_hours.start} - ${user.working_hours.end}`}</td>
                <td headers="meeting-header">
                  {eventsWithinWorkingHours.length > 0 ? (
                    eventsWithinWorkingHours.map((event: any) => (
                      <ul key={event.id}>
                        <li>{event.title}</li>
                      </ul>
                    ))
                  ) : (
                      <p>No meetings within working hours</p>
                    )}
                </td>
                <td headers="time-header">
                  {eventsWithinWorkingHours.length > 0 ? (
                    eventsWithinWorkingHours.map((event: any) => (
                      <ul key={event.id}>
                        <li>
                          {new Date(event.start).toLocaleString('en-US', {
                            timeZone: user.working_hours.time_zone,
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })} -
                          {new Date(event.end).toLocaleString('en-US', {
                            timeZone: user.working_hours.time_zone,
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZoneName: 'short',
                          })}
                        </li>
                      </ul>
                    ))
                  ) : (
                      <p>No meetings within working hours</p>
                    )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
