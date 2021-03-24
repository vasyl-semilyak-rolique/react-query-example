import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Switch, BrowserRouter as Router, NavLink } from 'react-router-dom';

import { UsersPage } from './Users';
import { UserPage } from './User';
import { PostPage } from './Post';
import { PostsPage } from './Posts';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <h2 className="text-center font-medium text-xl my-4">React Query</h2>
        <nav className="flex px-6 mb-5 justify-center items-center">
          <NavLink
            to={UsersPage.link()}
            className="py-2 px-3 rounded-md flex border border-gray-400 transit mr-2"
            activeClassName="border-gray-900 font-bold"
          >
            Users
          </NavLink>
          <NavLink
            to={PostsPage.link()}
            className="py-2 px-3 rounded-md flex border border-gray-400 transit"
            activeClassName="border-gray-900 font-bold"
          >
            Posts
          </NavLink>
        </nav>
        <Switch>
          <UserPage exact />
          <UsersPage exact />
          <PostsPage exact />
          <PostPage exact />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};
