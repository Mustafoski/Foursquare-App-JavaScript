// //https://api.foursquare.com/v2/venues/search?v=20161016&near=Struga&intent=checkin
// &client_id=KTKZSZO410ZEIBDVBGNZLX2VSTMAXLVA4NINTZ1SNUBFWIJ4
// &client_secret=0AZBQ5OAAC14H1100WJWUFPIJIYJQ1DUG1CNBXLICV5W4VZ1
// near=Struga
const SEARCH_VIEW  = document.getElementById('search_view');
const RESULTS_VIEW = document.getElementById('results_view');

const userSearchedWord = document.getElementById('search_input');

const API_BASE = 'https://api.foursquare.com/v2/venues/search?v=20161016&intent=checkin&limit=50';
const CLIENT_ID ='&client_id=KTKZSZO410ZEIBDVBGNZLX2VSTMAXLVA4NINTZ1SNUBFWIJ4';
const CLIENT_SECRET = '&client_secret=0AZBQ5OAAC14H1100WJWUFPIJIYJQ1DUG1CNBXLICV5W4VZ1';




function pageLoaded(){
      // page started hide results_view and gallery_view
    RESULTS_VIEW.style.visibility = 'hidden';
   
}


function getVenues(){

	var url = API_BASE + CLIENT_ID + CLIENT_SECRET + '&near=' + userSearchedWord.value;
	fetch(url)
		.then((response) => {
			console.log(response);
			if(response.status !== 200){
				console.error("Invalid API");
			}

			response.json().then((data) => {
				console.log(data);

				var name = '';
				var venues = data.response.venues;

				venues.forEach((venue) => {
					console.log(venue.name);

					name += "<div class='card'> "
                   	+ "<br />"
                   	+ "<p>" + venue.name + ' : '+ '<span>' + venue.stats.checkinsCount  + " Checkins"+ '</span>' + "</p>"
                   	+ '</div>';

                   	
				});

				RESULTS_VIEW.style.visibility = 'visible';

				if (name !== '') {
					RESULTS_VIEW.innerHTML = name;
				} else {
					RESULTS_VIEW.innerHTML = '<p>There was an error in response!</p>';
				}
			});

		}).catch((err) =>  {
			console.error('Invalid data', err);
			
		});


}