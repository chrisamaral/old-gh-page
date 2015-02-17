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
        esse tipo de ferramenta é geralmente chamado de Field Service, Work Force Management ou algo do tipo. Em algum momento a Sim TV chegou a conclusão
        que precisava de uma plataforma dessas, mas nenhuma das disponíveis no mercado estava dentro do seu orçamento ou integrava bem com
        seu CRM. Então eu desenvolvi uma. A plataforma conta com um aplicativo android utilizado pelos técnicos e um portal web.
        Dentro dos recursos disponíveis e do tempo de implantação eu fiquei até bem satisfeito com o resultado e chegamos a receber
        propostas de compra da ferramenta. Apesar de todas as funcionalidades a parte que é de longe mais complexa e merece
        destaque é o algorítimo de roteamento, que eu implementei do zero e depois de alguns rewrites e muito fine tuning se tornou bem
        eficiente e confiável. <br/><strong>keywords: gps, realtime, google api, traveling salesman.</strong>
      </p>
      `
    },
    {
      src: 'https://www.youtube.com/embed/nZj6u6xVgkk',
      caption: `
      <p>
        Apesar do Google Apps desde meu início eu percebi que a comunicação dentro da empresa ainda era desnecessariamente complicada,
        isso me motivou a criar um chat dentro do portal. Por design ele pula o processo de adicionar amigos/contatos -
        como no skype, google talk, etc - simplesmente todos usuários (em torno de 150) aparecem numa lista única.
        Devido a sua simplicidade ele acabou se tornando a principal forma de comunicação entre os técnicos na rua
        e a equipe de suporte ao técnico que que fica na sede, diminuindo drasticamente o volume de ligações.
        Ele funciona através de long polling e utiliza o memcached pra registrar os usuários online e
        é uma parte do portal que eu pretendia revisitar e eventualmente migrar a comunicação pra websockets mas como
        haviam outras demandas mais importantes, essa melhoria nunca saiu do papel.
      </p>`
    },
    {
      src: 'https://www.youtube.com/embed/PpafcSNw9Uk',
      caption: `
      <p>
        Essa foi uma ferramenta criada para facilitar a identificação e o controle de problemas na rede,
        ela conta com três partes chaves:

        <strong>1) Display</strong>, que é consultado por toda empresa, especialmente pelo callcenter que
        precisa saber informar ao assinante quando sua região está sofrendo com algum problema;

        <strong>2) Monitor</strong>, que é integrado com o CRM da empresa e aponta para a equipe de monitoração os locais com maior
        volume de reclamações;

        <strong>3) Controle de Eventos</strong>, que é um sistema de trouble ticket onde os tickets de um
        certo tipo são publicados no Display.
      </p>`
    },
    {
      src: 'https://www.youtube.com/embed/LnbUkxpDL3Q',
      caption: `
      <p>
        Alguns tipos de serviço de campo eram realizados por técnicos terceirizados, e o orçamento deles era feito através de planilhas onde eram anotados
        a quantidade de ordens de serviços realizadas e outras variáveis do tipo.
        Eu desenvolvi essa ferramenta com o intuito de prover uma alternativa automatizada e facilmente auditável pra esse orçamento.
      </p>
      `
    },
    {
      src: 'https://www.youtube.com/embed/o0MBhcgb_5w',
      caption: `
      <p>
        Sempre foi uma demanda do meu gestor que todos os parâmetros do sistema fossem flexíveis e facilmente configuráveis,
        então um painel de administração robusto era algo inevitável. De fato essa tela se tornou bem complexa e com muitas opções,
        mas eu não me arrependo... flexibilidade é um trade-off.
      </p>
      `
    },
    {
      src: 'https://www.youtube.com/embed/qtHuqoynEqg',
      caption: `
      <p>
        Essa foi mais uma ferramenta de monitoração, a partir dela era possível monitorar os cable modems remotamente através de SNMP.
        Foi uma das minhas últimas criações na empresa, de fato, essa é uma versão beta.
      </p>`
    }

  ];

  var Slide = React.createClass({
    render () {
      var video = this.props.video;

      return <div className='slide' style={{display: 'table-cell'}}>
        <iframe width={this.props.width} height={window.innerHeight * 0.7} src={video.src} allowFullScreen />
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

      var carouselStyle = {
        width: (100 * videos.length) + '%',
        display: 'table',
        transition: 'transform .5s ease'
      };

      carouselStyle.WekitTransition = carouselStyle.transition;

      var offsetX = 0 - (this.state.currentSlide * (100 / videos.length));
      carouselStyle.transform = `translateX(${offsetX}%)`;

      carouselStyle.MozTransform =
          carouselStyle.msTransform =
          carouselStyle.OTransform =
          carouselStyle.WebkitTransform = carouselStyle.transform;

      var slideWidth = document.getElementById('EngCarousel').clientWidth;
      var toRight = '> ' + Math.abs(videos.length - 1 - this.state.currentSlide);
      var toLeft = Math.abs(0 - this.state.currentSlide) + ' <';

      return (
        <div className='carousel'>
          <div style={{position: 'relative'}}>
            <div style={{overflowX: 'hidden'}}>
              <div style={carouselStyle}>
                {
                  videos.map(function (video, index) {
                    return <Slide key={index} video={video} index={index} width={slideWidth} />;
                  })
                }
              </div>
            </div>

            {this.state.currentSlide < videos.length - 1
              && <a className='nv n' onClick={this._nextSlide}>{toRight}</a>}
            {this.state.currentSlide > 0
              && <a className='nv p' onClick={this._prevSlide}>{toLeft}</a>}

          </div>
          <div className='caption' dangerouslySetInnerHTML={{__html: videos[this.state.currentSlide].caption}} />


        </div>
      );
    }
  });

  window.CVVideoCarousel = Carousel;
}());