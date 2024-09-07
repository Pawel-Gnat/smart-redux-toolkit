import { Provider } from 'react-redux';

import { store } from './redux/store';

import { UsersTable } from './components/users-table';
import { UsersFilters } from './components/users-filters';
import { HeadingH1 } from './components/typography';

function App() {
  return (
    <Provider store={store}>
      <main className="container mx-auto px-4">
        <HeadingH1 text="Users List" />
        <UsersFilters />
        <UsersTable />
      </main>
    </Provider>
  );
}

export default App;
