'use strict';

require('./preloader/preloader')();

var MAP_STYLES = 'assets/map.json';

require('./preloader/preloader')();

var myMap = document.querySelector(".map");

var load = require('./load');

load(myMap, MAP_STYLES, function (styles) {
    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

    var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(55.765405, 37.689795),
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(myMap, mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
});