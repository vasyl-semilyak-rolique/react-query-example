import React from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-hoc';
import { api } from './api';
import { PostPage } from './Post';
import { Spinner } from './Spinner';
import { Post, QUERIES } from './types';

const PostsRoute = Route(`/posts`);

export const PostsPage = PostsRoute(() => {
  const { data, isLoading } = useQuery(QUERIES.POSTS, async () => {
    try {
      const { data } = await api.get('/posts');

      return data as Post[];
    } catch (error) {
      console.log('Something went wrong', error);
    }
  });

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="px-4 flex flex-col text-center">
      {data?.map((p) => (
        <NavLink
          key={p.id}
          to={PostPage.link({ postId: p.id })}
          className="text-blue-500 mb-2"
        >
          {p.title}
        </NavLink>
      ))}
    </div>
  );
});
