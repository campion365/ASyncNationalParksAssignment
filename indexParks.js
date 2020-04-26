
'use strict';

const baseURL = 'https://developer.nps.gov/api/v1/parks?';
const apiKey = 'API_KEY=Nnprfx6cNDApuJ6Fz6zYTneYxgvALapS4ZOLV2h2&';

//stateCode=mn&limit=10 - this is what final area looks like

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}' target= "_blank">Website</a>
      </li>`
    )
  };
  $('#results').removeClass('hidden');
};

function getParksResults(stateInput, resultsInput) {
  const params = {
    stateCode: `${stateInput}`,
    limit: `${resultsInput}`,
  };

  const queryString = formatQueryParams(params)
  const url = baseURL + apiKey + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log("response ok");
        return response.json();
      }
      throw new Error(response.statusText);
    })

    .then(responseJSON => {
      if (responseJSON.data.length === 0)
        {console.log(responseJSON)
        throw new Error ("No Results Found")}

      displayResults(responseJSON) 
    })
    .catch(error => {
      $('#js-error-msg').text(`${error.message}`);
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateInput = $('#State-Field').val()
    // $("#State-Field").val('');
    const resultsInput = $('#Results-NumField').val();
    // $("#Results-NumField").val('');
    getParksResults(stateInput, resultsInput);
    console.log("submit recorded");
  });

}

$(watchForm);
