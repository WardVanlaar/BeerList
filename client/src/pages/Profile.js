import { React, useState, setState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ProfileBrewList from '../components/ProfileBrewList';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { UPDATE_FAVBEER } from '../utils/mutations';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [favBeer, setFavBeer] = useState('Click Me');
  const [updateFavBeer, { error }] = useMutation(UPDATE_FAVBEER);

  const user = data?.me || data?.user || {};

  const handleSelect = (beer) => {
    try {
      // save book id to state to change the save button
      setFavBeer(beer);
      // Mutation, add Brewery to User
      const { data } =  updateFavBeer({
          variables: { beer }
      });

      if (error) {
          throw new Error('something went wrong!');
        }
    } catch (err) {
        console.error(err);
    }
  }

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  return (
    <div className="text-center">
      <div className="text-center my-5">
        <h2 className="bg-dark text-secondary p-3 display-inline-block text-center">
          Your Favorite Beer: {user.favBeer}
        </h2>
        <DropdownButton onSelect={handleSelect} alignRight title={favBeer } id="dropdown-menu-align-right">
          <Dropdown.Item eventKey="Ale">Ale</Dropdown.Item>
          <Dropdown.Item eventKey="IPA">IPA</Dropdown.Item>
          <Dropdown.Item eventKey="Stout">Stout</Dropdown.Item>
        </DropdownButton>
      </div>
      

      <div className="">
        <div className="col-12 mb-3 col-lg-8 flex-row justify-space-between mb-3">
          <ProfileBrewList
            breweries={user.breweries}
            title={`${user.username}'s Favorite Breweries`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
