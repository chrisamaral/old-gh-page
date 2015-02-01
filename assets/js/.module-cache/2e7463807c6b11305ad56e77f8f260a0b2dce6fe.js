LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, countdown) {
  'use strict';

  var FancyAge = React.createClass({displayName: "FancyAge",
    render: function () {

      var date = new Date(this.props.timestamp);
      var diff = countdown(date);

      return (
        React.createElement("span", null, 'Nascido há exatamente ' + diff + ' atrás')
      );
    }
  });

  var bdElem = document.getElementById('birthday');

  React.render(React.createElement(FancyAge, {timestamp: parseInt(bdElem.dataset.timestamp, 10)}), bdElem);

}(window.React, window.countdown));});
