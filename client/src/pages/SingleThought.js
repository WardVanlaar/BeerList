import React from 'react';
import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_REACTION } from '../utils/queries';

const SingleReaction = (props) => {
  const { id: reactionId } = useParams();

  const { loading, data } = useQuery(QUERY_REACTION, {
    variables: { id: reactionId },
  });

  const reaction = data?.reaction || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {reaction.brewId}
          </span>{' '}
          reaction on {reaction.createdAt}
        </p>
        <div className="card-body">
          <p>{reaction.reactionBody}</p>
        </div>
      </div>

     

      {Auth.loggedIn()}
    </div>
  );
};

export default SingleReaction;
