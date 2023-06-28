import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/use-action';
import { RootState } from '../state/store';
import { UserTable } from '../components/UserTable';

export const HomePage = () => {
  const selectUsers = (state: RootState) => state.user.users;
  const users = useSelector(selectUsers);
  const { fetchToDoUser } = useActions();
  const [selectedUser, setSelectedUser] = useState<number | undefined>(undefined);

  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const fetchUsers = useCallback(async () => {
    try {
      await fetchToDoUser();
    } catch (error) {
      console.log(error);
    }
  }, [fetchToDoUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);



  return (
    <div className="container is-widescreen">

      {loading ? (
        <p className="notification is-info is-centered">Loading...</p>
      ) : error ? (
        <p className="notification is-danger">{error}</p>
      ) : (
            <>
              <div className="select">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                >
                  <option value={0}>Filter by user</option>
                  {users &&
                    users.map((user: any) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.user_name}
                      </option>
                    ))}
                </select>
              </div>
              <UserTable users={users} selectedUser={selectedUser} />
            </>
          )}
    </div>
  );
};
