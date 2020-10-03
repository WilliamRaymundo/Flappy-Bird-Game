console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let frames = 0;
const son_hit = new Audio();
son_hit.src = './efeitos/hit.wav';


// [Chao]
function criaChao(){
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  atualiza(){
  	const movimento_chao = 1;
  	const repete = chao.largura /2 ;
  	const movimentacao = chao.x - movimento_chao;
  	chao.x = movimentacao % repete;
  },
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,//assim pegamos o segundo chão e colocamos na frente do otro chão
      chao.largura, chao.altura,
    );
  },
}
return chao;
}

// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)//0 . 0 começa do topo do canvas, até o final dele

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,//assim pegamos o segundo plano de funto e colocamos na frente do otro plano
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

function fazColisao(flappyBird, chao){
	const flappyBirdY = flappyBird.ycanv + flappyBird.altura;
	const chaoY = chao.y;

	if(flappyBirdY >= chaoY){
		return true;
		
	}

	return false;
}

function criarBird() {
const flappyBird = {
	spriteX: 0,
	spriteY: 0,
	largura: 33,
	altura: 24,
	xcanv: 10,
	ycanv: 50,
	velocidade: 0,
	gravidade:0.25,
	pulo:4.6,
	pula(){
		flappyBird.velocidade =- flappyBird.pulo;
	},

	atualiza(){
		if(fazColisao(flappyBird,globais.chao)){
			son_hit.play();
			setTimeout(() =>{
				mudaPraTela(Telas.INICIO);
			}, 500);
		return;
		}
		flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;

		flappyBird.ycanv = flappyBird.ycanv + flappyBird.velocidade;

	},
	 movimentos: [
      { spriteX: 0, spriteY: 0, }, // asa pra cima
      { spriteX: 0, spriteY: 26, }, // asa no meio 
      { spriteX: 0, spriteY: 52, }, // asa pra baixo
      { spriteX: 0, spriteY: 26, }, // asa no meio 
    ],
    frameAtual: 0,
    atualizaFrameAtual(){
    	const intervaloFrames = 10;
    	const passouFlame = frames % intervaloFrames === 0 ;
    	if(passouFlame){
    		const baseMovimento = 1;
  		const incremento = baseMovimento + flappyBird.frameAtual ;
  		const baseRepete = flappyBird.movimentos.length;
  		flappyBird.frameAtual = incremento % baseRepete;
    	}
    	
    },
	desenha(){
		flappyBird. atualizaFrameAtual();
		const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
		contexto.drawImage(
			sprites,
			spriteX,spriteY, //sprite x, e y
			flappyBird.largura,flappyBird.altura, //tamanho do recorte
			flappyBird.xcanv,flappyBird.ycanv, //posição do sprite no canvas
			flappyBird.largura,flappyBird.altura,  // tamanho do sprit no canvas
		);
	}
}
return flappyBird;
}





// [tela de incio]
const msgIncial = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      msgIncial.spriteX, msgIncial.spriteY,
      msgIncial.largura, msgIncial.altura,
      msgIncial.x, msgIncial.y,
      msgIncial.largura, msgIncial.altura,
    );

  },
};
const globais = {};
let TelaAtiva = {};
	function mudaPraTela(novaTela){
		TelaAtiva = novaTela;

		if(TelaAtiva.inicializa){
			TelaAtiva.inicializa();
		}
	
	}	


const Telas = {
	INICIO: {
		inicializa(){
			globais.flappyBird = criarBird();
			globais.chao = criaChao();
		},
		desenha(){
			planoDeFundo.desenha();
  			globais.chao.desenha();
  			globais.flappyBird.desenha();
			msgIncial.desenha();

		},
		click(){
			mudaPraTela(Telas.JOGO);
		},
		atualiza(){
			globais.chao.atualiza();
		}	
	}
};

Telas.JOGO = {
	desenha(){
		planoDeFundo.desenha();
  		globais.chao.desenha();
  		globais.flappyBird.desenha();

	},
	click(){
		globais.flappyBird.pula();
	},
	atualiza(){
		globais.chao.atualiza();
		globais.flappyBird.atualiza();
	}
};


function loop(){ //a ordem faz diferença

	TelaAtiva.desenha();
	TelaAtiva.atualiza();
 	frames += 1;


	requestAnimationFrame(loop);
}
window.addEventListener('click', function(){
	if(TelaAtiva.click){
		TelaAtiva.click();
	}
});

mudaPraTela(Telas.INICIO);
loop();