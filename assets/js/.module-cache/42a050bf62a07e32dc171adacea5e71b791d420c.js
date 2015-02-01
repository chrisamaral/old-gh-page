LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, countdown) {
  'use strict';
  var crossHair = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABs0lEQVR42uWXzysEYRjHZ8vR0Y/z66BEItnIwT8gFwdHtSdtUkpaSW+TRFJKkpNydHCRf8BBtt1EIuVgzn4cHRWfp9l6Z2cHO2bWq0x9nsO87/N9v/M+877zTsZJcin97nhuJolEouTfNaB0F3EUstAjd6AFXsCDGyjBKabu0jOg9CBxEkbgHs7hCh7gEdqhA/pgGDrhDA4xUk5mQOk8cQLKFcHLUHttCZTurxgW40e078Y3oHQzcREGYAeRk3qnNKAxRpyBC1hD4zWOgdXKVK6QeB17cKPTS1x2pHSeu1SfAX/ax2Eh0eDVJjbgOKoc4fpJ3dZh60fT/rkJKcccFMIvZtjAJvGNToXUBjfa8mBNaM9HG/DX+T7ka972dAzI6pAS5IL7RNDAtCPr2HOnUh/cjHHgyD7iuXtRBuTpS8HGBhiQh8wyRi7KgGyjszQWYwjG+xYoPUTcJicbZeCZ2E3jUwMNtBFvyWk1BkQkfH0nmmLOH5gB02j9HbC+CqzvA5Z3Qr+TxW+B38ny19DvbPE8YJIsnoj8RMtnQiNi6VRcLWjxv6DaiKU/o69N/aef0wZdH0hH9SEDyB1IAAAAAElFTkSuQmCC';
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
      var bombHere = new google.maps.LatLng(-22.924797, -43.203953);

      mapContainer.style.height = Math.floor(window.innerHeight * 0.4) + 'px';
      mapContainer.style.display = 'block';
      mapContainer.style.margin = '1em auto';
      mapContainer.style.width = Math.floor(window.innerWidth * 0.4) + 'px';


      captionElem.style.display = 'block';
      captionElem.style.textAlign = 'center';
      captionElem.style.marginBottom = '2em';

      captionElem.parentNode.insertBefore(mapContainer, captionElem);

      var gMap = new google.maps.Map(mapContainer, {
        zoom: 14,
        center: bombHere,
        disableDefaultUI: true
      });

      new google.maps.Marker({
        position: bombHere,
        map: gMap,
        icon: {
          url: crossHair,
          size: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
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
