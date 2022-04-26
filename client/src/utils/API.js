// Routes for Brewery API
export const fetchBreweries = () => {
    // Request Options
    const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com',
          'X-RapidAPI-Key': '4d450d531cmsh0a3b57544381fc5p125a0djsne88f21e4d729'
      }
  };

  // fetch, format and return data
  return ( fetch('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries', options)
    .then(response => response.json())
    .catch(err => console.error(err))
  );
};