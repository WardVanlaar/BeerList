// Import React and Bootstrap
import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup, Row } from 'react-bootstrap';



// Import API Queries from utils to get data
import { fetchBreweries } from '../../utils/API';

const BrewList = () => {
    // Set State to pass props for data population and card creation
    const [ breweryState, setBreweryState ] = useState([]);
    
    // Get All Breweries
    const getBreweryData = async (event) => {
        // Set to wait for button press
        event.preventDefault();

        try {
            // send request, get response, format data for card creation
            const breweries = await fetchBreweries();
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
                            <Row xs={1} md={2} className="g-4">
                                <Col sm>
                                    <Card key={brew.id}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>{brew.type}</Card.Text>
                                <Card.Text>{brew.city}</Card.Text>
                                <Card.Text>{brew.state}</Card.Text>
                                <Card.Text>{brew.web}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
};

export default BrewList;