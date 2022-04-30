// Import React and Bootstrap
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, FormControl, CardGroup, Row, InputGroup, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'

// Import needed Utils
import { fetchBreweries } from '../../utils/API';
import { saveBrewIds, getSavedBrewIds } from '../../utils/localStorage';
import { ADD_BREWERY } from '../../utils/mutations';
import Auth from '../../utils/auth'


const BrewList = () => {
    // Set State to pass props for data population and card creation
    const [ breweryState, setBreweryState ] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    // Save Brewery to User functionality
    const [savedBrewIds, setSavedBrewIds] = useState(getSavedBrewIds());
    // add brewery to user through mutation
    const [saveBrew, { error }] = useMutation(ADD_BREWERY);

    useEffect(() => {
        return () => saveBrewIds(savedBrewIds);
    });
    
    // Get All Breweries
    const getBreweryData = async (event) => {
        // Set to wait for button press
        event.preventDefault();

        try {
            // send request, get response, format data for card creation
            // query logic based on search input in utils/API
            const breweries = await fetchBreweries(searchInput);
            const breweryData = breweries.map((brew) => ({
                brewId: brew.id,
                name: brew.name,
                type: brew.brewery_type,
                city: brew.city,
                state: brew.state,
                web: brew.website_url
            }));

            // Set state to our data to pass component props
            setBreweryState(breweryData);
        }catch (err) {
            console.error(err)
        }
    }

    const handleSaveBrew = async (brewId) => {
        const brewInput = breweryState.find((brew) => brew.brewId === brewId);

        // get User Auth Token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // save book id to state to change the save button
            setSavedBrewIds([...savedBrewIds, brewInput.brewId])
            // Mutation, add Brewery to User
            const { data } = await saveBrew({
                variables: { input: brewInput }
            });

            if (error) {
                throw new Error('something went wrong!');
              }
        } catch (err) {
            console.error(err);
        }
    }

    // Return Component
    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                {/* Search Bar and Buttons */}
                <Container>
                    <h1 className='font-link text-center my-2'>Search for breweries In:</h1>
                    <Form className="d-flex text-center" onSubmit={getBreweryData}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='search'
                                size='lg'
                                placeholder='Search for breweries'
                                className="me-2"
                                aria-label="Search"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='outline-success'>Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            {/* Card Holder */}
            <Container>
                <h2 className='my-5 text-center'>
                    {breweryState.length
                        ? `Viewing ${breweryState.length} Breweries
                        :`
                        : 'Search for a place to begin'}
                </h2>

                    {/* Create a card for each brewery */}
                <Row>
                    {breweryState.map((brew) => {
                        return (
                            <Card key={brew.brewId} id={brew.brewId} border='dark'>
                                <Card.Body>
                                    <Card.Title>{brew.name}</Card.Title>
                                    <Card.Text>{brew.type}</Card.Text>
                                    <Card.Text>{brew.city}</Card.Text>
                                    <Card.Text>{brew.state}</Card.Text>
                                    <Card.Text>{brew.web}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedBrewIds?.some((savedBrewId) => savedBrewId === brew.brewId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveBrew(brew.brewId)}>
                                            {savedBrewIds?.some((savedBrewId) => savedBrewId === brew.brewId)
                                                ? 'This brewery has been saved!'
                                                : 'Save this brewery!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </>
    )
};

export default BrewList;