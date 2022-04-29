// Import React and Bootstrap
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup } from 'react-bootstrap';
import styles from './brewlist.module.css';
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
                        : 'Search for a brewery'}
                </h2>
              
                    {/* Create a card for each brewery */}
                    <Row>
                    {breweryState.map((brew) => {
                        return (
                            <div className={styles.brewlist_container} >
                            <Col>
                            
                            <Card key={brew.id} border='dark' width = "24rem">
                                <Card.Body>
                                    <Card.Title>{brew.name}</Card.Title>
                                    <Card.Text>{brew.type}</Card.Text>
                                    <Card.Text>{brew.city}</Card.Text>
                                    <Card.Text>{brew.state}</Card.Text>
                                    <Card.Text>{brew.web}</Card.Text>
                                </Card.Body>
                            </Card>
                           
                            </Col>
                            </div>
                        );
                    })}
                    </Row>
              
            </Container>
        </>
    )
};

export default BrewList;