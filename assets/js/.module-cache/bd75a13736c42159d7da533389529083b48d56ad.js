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

  var FancyAge = React.createClass({displayName: "FancyAge",

    _update: function () {
      this.forceUpdate();
    },

    componentDidMount: function () {
      setInterval(this._update, 1000);
    },

    render: function () {

      return (
        React.createElement("span", null, 'Nascido há exatamente ' + countdown(this.props.date, null, units) + ' atrás')
      );
    }
  });

  var bdElem = document.getElementById('birthday');

  React.render(React.createElement(FancyAge, {date: new Date(bdElem.dataset.timestamp)}), bdElem);

}(window.React, window.countdown));});
