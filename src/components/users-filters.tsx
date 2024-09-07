import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../redux/user-slice';
import { AppDispatch, RootState } from '../redux/store';

import { capitalizeFirstLetter } from '../helpers';

import { Input } from './input';

export const UsersFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.users);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilter({ column: e.target.name as keyof typeof filters, value: e.target.value }),
    );
  };

  return (
    <div className="my-8 grid grid-cols-2 gap-4">
      {Object.keys(filters).map((key) => (
        <Input
          key={key}
          text={capitalizeFirstLetter(key)}
          value={filters[key as keyof typeof filters]}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
};
