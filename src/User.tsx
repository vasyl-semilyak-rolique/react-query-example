import React from 'react';
import { useQuery } from 'react-query';
import { Route } from 'react-router-hoc';
import { NavLink } from 'react-router-dom';

import { api } from './api';
import { Post, QUERIES, User as _User } from './types';

import { Spinner } from './Spinner';

const UserRoute = Route(
  { userId: Route.params.number },
  ({ userId }) => `/users/${userId}`
);

export const UserPage = UserRoute(
  ({
    match: {
      params: { userId },
    },
  }) => {
    const { data: userData, isLoading: userDataLoading } = useQuery(
      [QUERIES.USER, userId],
      async () => {
        try {
          const { data } = await api.get(`/users/${userId}`);

          return data as _User;
        } catch (error) {
          console.log('Something went wrong', error);
        }
      }
    );

    const { data: userPosts, isLoading: userPostsLoading } = useQuery(
      [QUERIES.USER_POSTS, userId],
      async () => {
        try {
          const { data } = await api.get(`/users/${userId}/posts`);

          return data as Post[];
        } catch (error) {
          console.log('Something went wrong', error);
        }
      }
    );

    if (userDataLoading) {
      return <Spinner />;
    }

    return (
      <div className="flex w-screen px-4 flex-col">
        <h2 className="text-base">
          {userData?.name} @{userData?.username}
        </h2>
        <div className="flex w-screen px-5">
          {userPostsLoading ? (
            <Spinner />
          ) : (
            <div className="mt-7 w-full">
              <h2 className="text-center">User posts</h2>
              <div className="flex flex-col">
                {userPosts?.map((p) => (
                  <NavLink
                    className="text-blue-400"
                    to={`/posts/${p.id}`}
                    key={p.id}
                  >
                    {p.title}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
