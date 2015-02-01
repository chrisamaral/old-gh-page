LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, countdown) {
  'use strict';

  var units =
    countdown.DECADES |
    countdown.YEARS |
    countdown.MONTHS |
    countdown.DAYS |
    countdown.HOURS |
    countdown.MINUTES |
    countdown.SECONDS;

  var rnd = '__StupidCallback' + Math.random().toString(36).substr(2);
  var mount = {
    map: function () {
      delete window[rnd];

      var captionElem = document.getElementById('noMap');
      var mapContainer = document.createElement('div');

      mapContainer.style.height = Math.floor(window.innerHeight * 0.4) + 'px';
      mapContainer.style.display = 'block';
      mapContainer.style.margin = '1em auto';
      mapContainer.style.width = Math.floor(window.innerWidth * 0.4) + 'px';
      captionElem.parentNode.insertBefore(mapContainer, captionElem);

      captionElem.style.display = 'block';
      captionElem.style.textAlign = 'center';
      captionElem.style.marginBottom = '2em';

      var bombHere = new google.maps.LatLng(-22.924797, -43.203953);

      var gMap = new google.maps.Map(mapContainer, {
        zoom: 14,
        center: bombHere,
        disableDefaultUI: true
      });

      var gMarker = new google.maps.Marker({
        position: bombHere,
        map: gMap
      });

    },
    birthday: function () {
      var FancyAge = React.createClass({displayName: "FancyAge",

        _update: function () {
          this.forceUpdate();
        },

        componentDidMount: function () {
          setInterval(this._update, 1000);
        },

        render: function () {

          return (
            React.createElement("span", null, countdown(this.props.date, null, units).toString().replace(', e', ' e') + ' de idade')
          );
        }
      });

      var bdElem = document.getElementById('birthday');

      React.render(React.createElement(FancyAge, {date: new Date(parseInt(bdElem.dataset.timestamp, 10))}), bdElem);
    }
  };


  mount.birthday();
  window[rnd] = mount.map;

  LazyLoad.js(['https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAS3CRxKmaantIpaXw6NNXdF8d2O5dHvIE&callback=' + rnd])

}(window.React, window.countdown));
});
