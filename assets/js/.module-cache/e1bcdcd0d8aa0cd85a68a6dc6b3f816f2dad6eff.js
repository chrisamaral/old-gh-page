LazyLoad.js([
  '//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js'
], function () {(function (React, moment) {
  'use strict';

  var FancyAge = React.createClass({displayName: "FancyAge",
    render: function () {
      debugger;
      return (
        React.createElement("span", null, moment(parseInt(this.props.timestamp)).fromNow(true) + ' de existência')
      );
    }
  });

  moment.locale(
    'pt', {
      relativeTime: {
        future: 'em %s',
        past: '%s atrás',
        s: 'segundos',
        m: '1 minuto',
        mm: '%d minutos',
        h: '1 hora',
        hh: '%d horas',
        d: '1 dia',
        dd: '%d dias',
        M: '1 mês',
        MM: '%d meses',
        y: '1 ano',
        yy: '%d anos'
      }
    }
  );

  var bdElem = document.getElementById('birthday');

  React.render(React.createElement(FancyAge, {timestamp: bdElem.dataset.timestamp}), bdElem);

}(window.React, window.moment));});
