LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, moment) {
  'use strict';

  var FancyAge = React.createClass({displayName: "FancyAge",
    render: function () {
      var m = moment();
      var d = parseInt(this.props.timestamp, 10);
      var years = m.diff(d, 'years');
      var months = m.diff(d, 'months');
      //var ds = m.diff(d, 'years');
      return (
        React.createElement("span", null, years + ' anos e ' + months + ' meses de existência')
      );
    }
  });

  var bdElem = document.getElementById('birthday');

  React.render(React.createElement(FancyAge, {timestamp: bdElem.dataset.timestamp}), bdElem);

}(window.React, window.moment));});
