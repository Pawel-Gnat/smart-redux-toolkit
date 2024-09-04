import { Provider } from 'react-redux';

import { store } from './redux/store';

import { UsersTable } from './components/users-table';
import { UsersFilters } from './components/users-filters';

function App() {
  return (
    <Provider store={store}>
      <main className="container mx-auto px-4">
        <h1 className="p-8 text-3xl">Users List</h1>
        <UsersFilters />
        <UsersTable />
      </main>
    </Provider>
  );
}

export default App;
