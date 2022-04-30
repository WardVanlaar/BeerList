import React from 'react';
import { Container, Button, Card, CardColumns, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'
import { REMOVE_BREWERY } from '../../utils/mutations';
import Auth from '../../utils/auth'
import { removeBrewId } from '../../utils/localStorage';

const BreweryList = ({ breweries }) => {

  const [ deleteBrew, { error }] = useMutation(REMOVE_BREWERY)


  const handleDeleteBrew = async (brewId) => {
    // get User Auth Token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
        return false;
    }

    try {
        // Mutation, add Brewery to User
        removeBrewId(brewId)
        const { data } = await deleteBrew({
            variables: { brewId }
        });

        if (error) {
            throw new Error('something went wrong!');
          }
    } catch (err) {
        console.error(err);
    }
  }

  if (!breweries.length) {
    return <h3>No Saved Breweries Yet</h3>;
  }

  return (
    <Container>
      <h2>
        {`Viewing ${breweries.length} Saved Breweries`}
      </h2>
      <CardColumns>
          {/* Create a card for each brewery */}
          {breweries.map((brew) => {
              return (
                  <Card key={brew.brewId} id={brew.brewId} border='dark'>
                      <Card.Body>
                          <Image width="100%"
                          src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg" className = "card-img-top" rounded/>
                          <Card.Title>{brew.name}</Card.Title>
                          <Card.Text> Brewery Type: {brew.type}</Card.Text>
                          <Card.Text className='h2'> Brewery City: {brew.city}</Card.Text>
                          <Card.Text> Brewery State: {brew.state}</Card.Text>
                          <a href={brew.web}>Go to Site!</a>
                          {Auth.loggedIn() && (
                            <Button
                                className='btn-block btn-info'
                                onClick={() => handleDeleteBrew(brew.brewId)}>
                                {`Delete`}
                            </Button>
                          )}
                      </Card.Body>
                  </Card>
              );
          })}
      </CardColumns>
  </Container>
  );
};

export default BreweryList;
