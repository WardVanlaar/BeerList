
// Import React and Bootstrap
import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, FormControl, Row, Image } from 'react-bootstrap';
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
                    <h1 className='font-link text-center my-2'>Search for breweries In:</h1>
                    <Form className="d-flex text-center" onSubmit={getBreweryData}>
                        <FormControl
                        type="search"
                        placeholder="California"
                        className="me-2"
                        aria-label="Search"
                        size ="lg"
                        />
                        <Button type='submit' variant="outline-success">Search</Button>
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
                                         <Image width="100%"
                                        src= "https://cdn.craftbeer.com/wp-content/uploads/Argus.jpg" className = "card-img-top"
                                        rounded/>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>Brewery Type:  {brew.type}</Card.Text>
                                        <Card.Text className='h2'>Brewery City:  {brew.city}</Card.Text>
                                        <Card.Text>Brewery State:  {brew.state}</Card.Text>
                                        <Card.Text>Brewery Site:  {brew.web}</Card.Text>
                                        <Button variant="primary">Add to Profile</Button>
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