// Import React and Bootstrap and external modukes
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'
// Import needed Utils
import { fetchBreweries } from '../../utils/API';
import { saveBrewIds, getSavedBrewIds } from '../../utils/localStorage';

// CHANGE THIS OUT FOR MUTATION 
const SAVE_BREW = console.log(' Save Brewery Mutation ')

const BrewList = () => {
    // Set State to pass props for data population and card creation
    const [ breweryState, setBreweryState ] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
    
    // Get All Breweries
    const getBreweryData = async (event) => {
        // Set to wait for button press
        event.preventDefault();

        try {
            // send request, get response, format data for card creation
            // query logic based on search input in utils/API
            const breweries = await fetchBreweries(searchInput);
            const breweryData = breweries.map((brew) => ({
                id: brew.id,
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

    // Return Component
    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                {/* Search Bar and Buttons */}
                <Container>
                    <h1>Search for breweries!</h1>
                    <Form onSubmit={getBreweryData}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for breweries'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            {/* Card Holder */}
            <Container>
                <h2>
                    {breweryState.length
                        ? `Viewing ${breweryState.length} results:`
                        : 'Search for a book to begin'}
                </h2>
                <CardColumns>
                    {/* Create a card for each brewery */}
                    {breweryState.map((brew) => {
                        return (
                            <Card key={brew.id} id={brew.id} border='dark'>
                                <Card.Body>
                                    <Card.Title>{brew.name}</Card.Title>
                                    <Card.Text>{brew.type}</Card.Text>
                                    <Card.Text>{brew.city}</Card.Text>
                                    <Card.Text>{brew.state}</Card.Text>
                                    <Card.Text>{brew.web}</Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
};

export default BrewList;