var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/fixtures',
  headers: {
    'x-rapidapi-key': 'c2eb6a05becb1fade6b70900471caad5',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
