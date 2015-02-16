(function () {

  var videos = [
    {
      src: 'https://www.youtube.com/embed/Vtxe7rXbeeg',
      caption: `
      <p>
        O dashboard foi basicamente minha primeira criação na empresa, e acabou se tornando uma das maiores.
        Criado com o intuito de permitir uma rápida análise do volume de reclamações dos clientes, ele rapidamente
        cresceu além de seu escopo inicial se tornando um agregador de diversas estatísticas e informações da
        empresa totalizando mais de 100 gráficos.
        No lado técnico o dashboard é uma aplicação bem flexível (estruturado a nível de banco de dados)
        onde tudo é <i>on demand</i> e AJAX.
        Os gráficos são feitos em cima do <a href='http://www.highcharts.com/'>highcharts</a>
        e as tabelas em cima do <a href='https://developers.google.com/chart/interactive/docs/gallery/table'>google charts</a>.
        <br/><strong>keywords: BI, SPA, Dendency Injection.</strong>
      </p>`
    },
    {
      src: 'https://www.youtube.com/embed/YF7vA416POY',
      caption: `
      <p>
        Todas as grandes empresas de telecomunicações do mercado tem alguma ferramenta destinada ao controle de suas equipe de campo,
        geralmente chamada de Field Service, Work Force Management ou algo do tipo. Em algum momento a Sim TV chegou a conclusão
        que precisava de uma plataforma dessas, mas nenhuma das disponíveis no mercado estava dentro do seu orçamento ou integrava bem com
        seu CRM. Então eu desenvolvi uma. A plataforma conta com um aplicativo android utilizado pelos técnicos e um portal web.
        Dentro dos recursos disponíveis e do tempo de implantação eu fiquei até bem satisfeito com o resultado e chegamos a receber um bocado de
        propostas de compra da ferramenta. Apesar de todas as funcionalidades (juro, eu mesmo me perco) a parte que é de longe mais complexa e merece
        destaque é o algorítimo de roteamento, que eu implementei do zero e depois de alguns rewrites e muito fine tuning se provou bastante
        eficiente e confiável. <br/><strong>keywords: gps, realtime, google api, traveling salesman.</strong>
      </p>
      `
    },
    {
      src: 'https://www.youtube.com/embed/nZj6u6xVgkk',
      caption: `
      <p>
        Acredito que todo portal online é incompleto sem alguma espécie de chat privado, não podia ser
        diferente nesse caso. Além de permitir uma comunicação mais fácil dentro da empresa
        (pulando o tedioso processo de adicionar toda sua equipe no skype, google talk, etc) ele se tornou a principal forma
        de comunicação entre os técnicos na rua e a equipe de suporte ao técnico que que fica na sede,
        diminuindo drasticamente o volume de ligações. Ele funciona através de long polling
        e é uma parte do portal que eu pretendia revisitar e eventualmente migrar pra websockets mas... faltou tempo.
      </p>`
    }
  ];

  var Slide = React.createClass({
    render () {
      var video = this.props.video;

      return <div className='slide'>
        <iframe width={this.props.width} height={window.innerHeight * 0.9} src={video.src} allowFullScreen />
        <div className='caption' dangerouslySetInnerHTML={{__html: video.caption}} />
      </div>;
    }
  });

  var Carousel = React.createClass({

    getInitialState() {
      return {currentSlide: 0};
    },

    _bounce () {

      if (this.state.currentSlide < 0) {
        setTimeout(this._nextSlide, 600);
      }

      if (this.state.currentSlide >= videos.length) {
        setTimeout(this._prevSlide, 600);
      }

    },

    _nextSlide () {
      this.setState({
        currentSlide: this.state.currentSlide + 1
      }, this._bounce);
    },

    _prevSlide () {
      this.setState({
        currentSlide: this.state.currentSlide - 1
      }, this._bounce);
    },

    render() {
      var carouselStyle = {width: (100 * videos.length) + '%'};
      var offsetX = 0 - (this.state.currentSlide * (100 / videos.length));
      carouselStyle.transform = `translateX(${offsetX}%)`;

      carouselStyle.MozTransform =
          carouselStyle.msTransform =
          carouselStyle.OTransform =
          carouselStyle.WebkitTransform = carouselStyle.transform;

      var slideWidth = document.getElementById('EngCarousel').clientWidth;

      return (
        <div className='carousel-wrapper'>
          <div className='carousel-container'>
            <div className='carousel' style={carouselStyle}>
              {
                videos.map(function (video, index) {
                  return <Slide key={index} video={video} index={index} width={slideWidth} />;
                })
              }
            </div>
          </div>
          <a className='n' onClick={this._nextSlide}>{'>'}</a>
          <a className='p' onClick={this._prevSlide}>{'<'}</a>
        </div>
      );
    }
  });

  window.CVVideoCarousel = Carousel;
}());