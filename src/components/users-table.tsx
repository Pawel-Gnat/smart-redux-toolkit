import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/user-slice';
import { AppDispatch, RootState } from '../redux/store';

import { capitalizeFirstLetter } from '../helpers';

import { FetchStatusText } from './typography';

export const UsersTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, status, error, filters } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <FetchStatusText text="Loading..." />;
  if (status === 'failed') return <FetchStatusText text={`Error: ${error}`} />;

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            {Object.keys(filters).map((key) => (
              <th
                key={key}
                className="border-b border-r border-gray-300 p-2 last:border-r-0"
              >
                {capitalizeFirstLetter(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={Object.keys(filters).length} className="p-4 text-center">
                No users found
              </td>
            </tr>
          )}

          {filteredUsers.map((user) => (
            <tr key={user.id}>
              {Object.keys(filters).map((key) => (
                <td
                  key={key}
                  className="border-r border-t border-gray-300 p-2 last:border-r-0"
                >
                  {user[key as keyof typeof filters]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
