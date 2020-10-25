'use strict';
const covidInfoSearchUrl = 'https://disease.sh/v3/covid-19';

const googleMapInfoSearchUrl = "";

function displayResults(responseJson){
    const cases = responseJson.cases;
    const deaths = responseJson.deaths;
    const recovered = responseJson.recovered;
    $('.Cases').empty();
    $('.Cases').append(`Cases: ${cases}`)
    $('.Deaths').empty();
    $('.Deaths').append(`Deaths: ${deaths}`)
    $('.Recovered').empty();
    $('.Recovered').append(`Recovered: ${recovered}`)
}

function getCurrentWorldData(){
    const url = `${covidInfoSearchUrl}/all?yesterday=false&twoDaysAgo=false&allowNull=true`
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

$(getCurrentWorldData())