import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/user-slice';
import { ChangeEvent } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { Input } from './input';
import { capitalizeFirstLetter } from '../helpers';

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
          text={capitalizeFirstLetter(key)}
          value={key}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
};
