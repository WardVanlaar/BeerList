import React from 'react';
import BrewList from '../components/BrewList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`} flex-row justify-space-between>
          <BrewList />
        </div>
      </div>
    </main>
  );
};

export default Home;
