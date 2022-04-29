import React from 'react';
import { Redirect, useParams, } from 'react-router-dom';
import {  Col, Button, Card, Row, Image } from 'react-bootstrap';
// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
// import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import { Container } from 'react-bootstrap';

const Profile = (props) => {
  const { username: userParam } = useParams();

  // const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

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

  // const handleClick = async () => {
  //   try {
  //     await addFriend({
  //       variables: { id: user._id },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div className="text-center">
      
        <h2 className="bg-dark text-secondary p-3 display-inline-block text-center" >
          Viewing {userParam ? `${user.username}'s` : 'your'} saved Breweries.
        </h2>

        <div>
      
        <Container className="my-5">

        <Row>
                   
                            <Col>
                                <Card  className="text-center" >
                                    <Card.Body>
                                         <Image width="100%"
                                        src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg" className = "card-img-top"
                                        rounded/>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>Brewery Type: </Card.Text>
                                        <Card.Text className='h2'>Brewery City:  </Card.Text>
                                        <Card.Text>Brewery State:  </Card.Text>
                                        <Card.Text>Brewery Site:  </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                     
                    
                            <Col>
                                <Card  className="text-center" >
                                    <Card.Body>
                                         <Image width="100%"
                                        src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg" className = "card-img-top"
                                        rounded/>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>Brewery Type: </Card.Text>
                                        <Card.Text className='h2'>Brewery City:  </Card.Text>
                                        <Card.Text>Brewery State:  </Card.Text>
                                        <Card.Text>Brewery Site:  </Card.Text>
                                       
                                    </Card.Body>
                                </Card>
                            </Col>
                     
                            <Col>
                                <Card  className="text-center" >
                                    <Card.Body>
                                         <Image width="100%"
                                        src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg" className = "card-img-top"
                                        rounded/>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>Brewery Type: </Card.Text>
                                        <Card.Text className='h2'>Brewery City:  </Card.Text>
                                        <Card.Text>Brewery State:  </Card.Text>
                                        <Card.Text>Brewery Site:  </Card.Text>
                                       
                                    </Card.Body>
                                </Card>
                            </Col>
                     
                </Row>
                </Container>
      </div>
    </div>
    
    
  );
};

export default Profile;
