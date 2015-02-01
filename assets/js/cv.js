LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, countdown) {
  'use strict';
  function $select (selector) {
    return [].slice.call(document.querySelectorAll(selector));
  }

  var crossHair = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABs0lEQVR42uWXzysEYRjHZ8vR0Y/z66BEItnIwT8gFwdHtSdtUkpaSW+TRFJKkpNydHCRf8BBtt1EIuVgzn4cHRWfp9l6Z2cHO2bWq0x9nsO87/N9v/M+877zTsZJcin97nhuJolEouTfNaB0F3EUstAjd6AFXsCDGyjBKabu0jOg9CBxEkbgHs7hCh7gEdqhA/pgGDrhDA4xUk5mQOk8cQLKFcHLUHttCZTurxgW40e078Y3oHQzcREGYAeRk3qnNKAxRpyBC1hD4zWOgdXKVK6QeB17cKPTS1x2pHSeu1SfAX/ax2Eh0eDVJjbgOKoc4fpJ3dZh60fT/rkJKcccFMIvZtjAJvGNToXUBjfa8mBNaM9HG/DX+T7ka972dAzI6pAS5IL7RNDAtCPr2HOnUh/cjHHgyD7iuXtRBuTpS8HGBhiQh8wyRi7KgGyjszQWYwjG+xYoPUTcJicbZeCZ2E3jUwMNtBFvyWk1BkQkfH0nmmLOH5gB02j9HbC+CqzvA5Z3Qr+TxW+B38ny19DvbPE8YJIsnoj8RMtnQiNi6VRcLWjxv6DaiKU/o69N/aef0wZdH0hH9SEDyB1IAAAAAElFTkSuQmCC';
  var units = countdown.DECADES |
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

      mapContainer.style.height = '40vh';
      mapContainer.style.minHeight = '200px';
      mapContainer.style.display = 'block';
      mapContainer.style.margin = '1em auto';
      mapContainer.style.width = '100%';
      mapContainer.style.color = 'rgb(30, 30, 30)';

      captionElem.style.display = 'block';
      captionElem.style.textAlign = 'center';

      captionElem.parentNode.insertBefore(mapContainer, captionElem);

      var gMap = new google.maps.Map(mapContainer, {
        zoom: 14,
        center: bombHere,
        disableDefaultUI: true
      });

      var gMarker = new google.maps.Marker({
        position: bombHere,
        map: gMap,
        title: '127.0.0.1',
        icon: {
          url: crossHair,
          size: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      var gInfo = new google.maps.InfoWindow({
        content: React.renderToStaticMarkup(
          React.createElement("address", {style: {color: 'rgb(30, 30, 30)'}}, 
            "Rua Itapiru, 1459", React.createElement("br", null), 
            "Rio Comprido - 20251-032", React.createElement("br", null), 
            "Rio de Janeiro - RJ, Brasil"
          )
        )
      });

      setTimeout(function () { gInfo.open(gMap, gMarker); }, 1000);
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
            React.createElement("span", null, countdown(this.props.date, null, units).toString().replace(', e', ' e'))
          );
        }
      });

      var bdElem = document.getElementById('birthday');

      React.render(React.createElement(FancyAge, {date: new Date(parseInt(bdElem.dataset.timestamp, 10))}), bdElem);
    }
  };

  $select('.toggle').forEach(function (node) {
    node.addEventListener('click', function (e) {
      e.preventDefault();
      var dd = e.target.parentNode;
      var c = 'zip';
      if (dd.classList) {
        dd.classList.toggle(c);
      } else {
        if (dd.className.indexOf(c) > -1) {
          dd.className += ' ' + c;
        } else {
          dd.className = dd.className.replace(c, '');
        }
      }
    });
  });

  mount.birthday();
  window[rnd] = mount.map;

  LazyLoad.js(['https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAS3CRxKmaantIpaXw6NNXdF8d2O5dHvIE&callback=' + rnd])

}(window.React, window.countdown));
});