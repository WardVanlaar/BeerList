// Import React and Bootstrap
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, FormControl, CardGroup, Row, InputGroup, Image } from 'react-bootstrap';
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
                    h1 className='font-link text-center my-2'>Search for breweries In:</h1>
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
                            <Col>
                                <Card key={brew.id} className="text-center" >
                                    <Card.Body>
                                        <Image
                                        src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg"
                                        rounded/>                                      
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>Brewery Type:  {brew.type}</Card.Text>
                                        <Card.Text className='h2'>Brewery City:  {brew.city}</Card.Text>
                                        <Card.Text>Brewery State:  {brew.state}</Card.Text>
                                        <Card.Text>Brewery Site:  {brew.web}</Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>   
                            </Col>

                        );
                    })}
                </Row>
            </Container>
        </>
    )
};

export default BrewList;