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

  return (
    <table className="table is-bordered is-striped is-narrow is-hoverable">
      <thead>
        <tr>
          <th id="user-id-header">User ID</th>
          <th id="user-name-header">User Name</th>
          <th id="working-hours-header">Working Hours</th>
          <th id="events-header">Events</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers !== null &&
          filteredUsers.map((user: any) => (
            <tr key={user.user_id}>
              <td headers="user-id-header">{user.user_id}</td>
              <td headers="user-name-header">{user.user_name}</td>
              <td headers="working-hours-header">
                {user.working_hours.start} - {user.working_hours.end}
              </td>
              <td headers="events-header">
                <ul>
                  {user.events.map((event: any) => (
                    <li key={event.id}>{event.title} ({event.start} - {event.end})</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
