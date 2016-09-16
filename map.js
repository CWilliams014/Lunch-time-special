$(document).ready(function() {
  initAutocomplete();
});

function initAutocomplete() {
    var start = new google.maps.LatLng(48.858547, 2.294513);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // Create the search box and link it to the UI element.
    var distances = [];
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var id = document.getElementById('pac-input').value
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    var CalcDistance = new google.maps.DistanceMatrixService;
    var responses = [];
    document.getElementById('b').addEventListener('click', Calc);

    function Calc() {
        var posting = [];
        var Real_Distances = distances
        Real_Distances.forEach(function(item) {
            CalcDistance.getDistanceMatrix({
              origins: [start],
              destinations: [item.LNGLT.A],
              travelMode: google.maps.TravelMode.DRIVING,
                }, function(response, status) {
                    if (status == google.maps.DistanceMatrixStatus.OK) {
                        responses.push(response);
                        var tings = response.rows
                        for (var value in tings) {
                            var gettingcloser = tings[value].elements;
                            for (var x in gettingcloser) {
                                var keyID = document.createTextNode(item.id);
                                keyID = document.createElement('div')
                                var value = document.createTextNode(gettingcloser[x].duration.text)
                                var keyAddress = document.createTextNode(item.address);
                                var RealKeyId = document.createTextNode(item.id)
                                var space = document.createTextNode('    ')
                                keyID.appendChild(RealKeyId);
                                keyID.appendChild(keyAddress);
                                keyID.appendChild(value);

              document.getElementById('times').appendChild(keyID)
              document.getElementById('times').appendChild(keyAddress)
              document.getElementById('times').appendChild(space)
              document.getElementById('times').appendChild(value)
              }
              var trafficLayer = new google.maps.TrafficLayer();
              trafficLayer.setMap(map);
            }
          }
        })
      })
    }
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        var markers2 = [];
        var markers3 = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            markers2.push(places);
            var id = document.getElementById('pac-input').value
            var DDDistance = google.maps.geometry.spherical.computeDistanceBetween(start, place.geometry.location)

            // var CoordinatesArray = new Array();
            // CoordinatesArray.push(place.geometry.location)
            var address = place.formatted_address;
            var A = place.geometry.location
            markers3.push({
                address: address,
                distance: DDDistance,
                id: id,
                LNGLT: {
                    A
                }
            })
            markers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            }));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
        markers3.sort(function(a, b) {
            return a.distance - b.distance
        })
      var results = markers3.sort(function(a, b) {
          return a.distance - b.distance
      })
    distances.push(markers3[0], markers3[1])
  })
}