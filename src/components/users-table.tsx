import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/user-slice';
import { AppDispatch, RootState } from '../redux/store';

import { capitalizeFirstLetter } from '../helpers';

export const UsersTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, status, error, filters } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            {Object.keys(filters).map((key) => (
              <th className="border-b border-gray-300 p-2">
                {capitalizeFirstLetter(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border-r border-t border-gray-300 p-2">{user.name}</td>
              <td className="border-t border-gray-300 p-2">{user.username}</td>
              <td className="border-l border-r border-t border-gray-300 p-2">
                {user.email}
              </td>
              <td className="border-t border-gray-300 p-2">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
