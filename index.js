//forsquare api key
const fsApiKey = "fsq3Iq9k5vkT518k9Oshpxq7pRNttCelv4gcjNc5DyaALEs="

//nav bar function
const navBar = document.getElementsByClassName("explorer")
const buttons = document.getElementsByTagName("button")


//event listeners here
//  for (i = 0; i < buttons.length; i++){
//     buttons.addEventListener("click", ()=>)
// }


    // mapboxgl.accessToken = 'MAPBOX_ACCESS_TOKEN';



const map = L.map('map')

map.setView([33.0366, -117.2914], 12)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let currentLatitude = null
let currentLongitude = null
    
//define user location with pin
navigator.geolocation.getCurrentPosition( function (position) {
    console.log(position);
    console.log(position.coords.latitude)
    currentLatitude = position.coords.latitude
    currentLongitude= position.coords.longitude
    let userMarker = L.marker([currentLatitude, currentLongitude]).addTo(map)
    .bindPopup('current')
    .openPopup();
    placeSearch()
    })

    async function placeSearch() {
        console.log(currentLatitude)
        try {
            const searchParams = new URLSearchParams({
              query: 'coffee',
              ll: `${currentLatitude},${currentLongitude}`,
              open_now: 'true',
              sort: 'DISTANCE'
            });
            const results = await fetch(
              `https://api.foursquare.com/v3/places/search?${searchParams}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: fsApiKey,
                }
              }
            );
            const data = await results.json();
            console.log(data)
            return data;
        } catch (err) {
            console.error(err);
        }
    }