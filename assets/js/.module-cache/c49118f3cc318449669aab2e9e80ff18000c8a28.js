LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '/assets/js/countdown.min.js'
], function () {(function (React, countdown) {
  'use strict';

  var FancyAge = React.createClass({displayName: "FancyAge",

    componentDidMount: function () {
      setInterval(function () {
        this.forceUpdate();
      }.bind(this), 1000);
    },

    render: function () {

      return (
        React.createElement("span", null, 'Nascido há exatamente ' + countdown(this.props.date) + ' atrás')
      );
    }
  });

  var bdElem = document.getElementById('birthday');

  React.render(React.createElement(FancyAge, {date: new Date(parseInt(bdElem.dataset.timestamp, 10))}), bdElem);

}(window.React, window.countdown));});
