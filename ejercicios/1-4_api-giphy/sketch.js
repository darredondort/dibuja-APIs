let api = 'https://api.giphy.com/v1/gifs/search?&api_key=';
let apiKey = 'GIPHY_KEY';
let query = '&q=stayhome';

function setup() {
  noCanvas();
  let url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  console.log(giphy);
  for (let i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }
}
