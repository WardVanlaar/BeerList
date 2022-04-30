import { useMutation } from "@apollo/react-hooks";
import { Jumbotron, Container, CardColumns, Col, Form, Button, Card, FormControl, CardGroup, Row, InputGroup, Image } from 'react-bootstrap';
import { REMOVE_BREWERY, ADD_REACTION } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { removeBrewId } from "../../utils/localStorage";
import React, { useState, useEffect } from "react";


const BreweryList = ({ breweries }) => {
  const [searchInput, setSearchInput] = useState("");
  const [addReaction, { err }] = useMutation(ADD_REACTION);
  const [ reactionState, setReactionState ] = useState([]);
  const [deleteBrew, { error }] = useMutation(REMOVE_BREWERY);

  const handleDeleteBrew = async (brewId) => {
    // get User Auth Token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      // Mutation, add Brewery to User
      removeBrewId(brewId);
      const { data } = await deleteBrew({
        variables: { brewId },
      });

      if (error) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReaction = async (event) => {
    event.preventDefault();
    // get User Auth Token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      // Mutation, add Brewery to User
      const reactionBody = searchInput;
      const { data } = await addReaction({
        variables: { reactionBody },
      });

      if (error) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };




  if (!breweries.length) {
    return <h3>No Saved Breweries Yet</h3>;
  }

  return (
    <Container>
      <h2>{`Viewing ${breweries.length} Saved Breweries`}</h2>
      <CardColumns>
        {/* Create a card for each brewery */}
        {breweries.map((brew) => {
          return (
            <div>
              <Card key={brew.brewId} id={brew.brewId} border="dark">
                <Card.Body>
                  <Card.Title>{brew.name}</Card.Title>
                  <Card.Text>{brew.type}</Card.Text>
                  <Card.Text>{brew.city}</Card.Text>
                  <Card.Text>{brew.state}</Card.Text>
                  <Card.Text>{brew.web}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      className="btn-block btn-info"
                      onClick={() => handleDeleteBrew(brew.brewId)}
                    >
                      {`Delete`}
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <Container>
                <Form
                  className="d-flex text-center"
                  onSubmit={handleAddReaction(searchInput)} 
                >
                  <Form.Row>
                    <Col xs={12} md={8}>
                      <Form.Control
                        name="searchInput"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="search"
                        size="lg"
                        placeholder="Add a reaction"
                        className="me-2"
                        aria-label="Search"
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Button type="submit" variant="outline-success">
                        Submit
                      </Button>
                    </Col>
                  </Form.Row>
                </Form>
                {/* <section>
                  {reactionState.map((singleReaction) => {
                    return (
                      <Card key={singleReaction._id} id={singleReaction._id} border="dark">
                        <Card.Body>
                          <Card.Title>{singleReaction.createdAt}</Card.Title>
                          <Card.Text>{singleReaction.reactionBody}</Card.Text>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </section> */}
              </Container>
            </div>
          );
        })}
      </CardColumns>
    </Container>
  );
};

export default BreweryList;
