import React from 'react';
import { useQuery } from 'react-query';
import { Route } from 'react-router-hoc';
import { NavLink } from 'react-router-dom';

import { api } from './api';

import { QUERIES, User } from './types';
import { Spinner } from './Spinner';
import { UserPage } from './User';

const UsersRoute = Route(`/users`);

export const UsersPage = UsersRoute(() => {
  const { data, isLoading } = useQuery(QUERIES.USERS, async () => {
    try {
      const { data } = await api.get('/users');

      return data as User[];
    } catch (error) {
      console.log('Something went wrong', error);
    }
  });

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="w-screen">
      {data?.map((u) => (
        <div key={u.id}>
          <h2>
            {u.name}{' '}
            <NavLink
              to={UserPage.link({ userId: u.id })}
              className="text-blue-500"
            >
              @{u.username}
            </NavLink>
          </h2>
        </div>
      ))}
    </div>
  );
});
