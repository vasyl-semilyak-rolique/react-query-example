import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Post, QUERIES, Comment } from './types';

import { Route } from 'react-router-hoc';
import { api } from './api';
import { Spinner } from './Spinner';

const PostRoute = Route(
  { postId: Route.params.number },
  ({ postId }) => `/posts/${postId}`
);

export const PostPage = PostRoute(
  ({
    match: {
      params: { postId },
    },
  }) => {
    const [showComments, setShowComments] = useState(false);
    const { data: postData, isLoading: postLoading } = useQuery(
      [QUERIES.POST, postId],
      async () => {
        try {
          const { data } = await api.get(`/posts/${postId}`);

          return data as Post;
        } catch (error) {
          console.log('Something went wrong', error);
        }
      }
    );

    const { data: comments, isLoading: commentsLoading } = useQuery(
      [QUERIES.COMMENTS, postId],
      async () => {
        try {
          const { data } = await api.get(`/posts/${postId}/comments`);

          return data as Comment[];
        } catch (error) {
          console.log('Something went wrong', error);
        }
      },
      { enabled: showComments }
    );

    if (postLoading) {
      return <Spinner />;
    }

    return (
      <div className="w-full px-4">
        <h1 className="font-bold mb-4 text-center">POST: {postData?.title}</h1>
        <p>{postData?.body}</p>
        {!comments?.length && (
          <div className="flex justify-center items-center mt-2">
            <button
              type="button"
              onClick={() => setShowComments(true)}
              className="border border-green-500 p-2 rounded bg-green-300 hover:shadow-md"
            >
              Load comments
            </button>
          </div>
        )}

        {commentsLoading ? (
          <Spinner />
        ) : (
          <>
            {comments?.length && (
              <div className="mt-2">
                <h2 className="mb-2">Comments</h2>
                {comments?.map((c) => (
                  <div key={c.id} className="border-gray-400 border mb-3">
                    <p>User: {c.email}</p>
                    <p>title: {c.name}</p>
                    <p>body: {c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
