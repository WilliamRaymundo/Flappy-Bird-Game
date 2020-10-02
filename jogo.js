console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');




// [Chao]
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
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
};

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

const flappyBird = {
	spriteX: 0,
	spriteY: 0,
	largura: 33,
	altura: 24,
	xcanv: 10,
	ycanv: 50,
	velocidade: 0,
	gravidade:0.25,

	atualiza(){
		flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;

		flappyBird.ycanv = flappyBird.ycanv + flappyBird.velocidade;

	},

	desenha(){
		contexto.drawImage(
			sprites,
			flappyBird.spriteX,flappyBird.spriteY, //sprite x, e y
			flappyBird.largura,flappyBird.altura, //tamanho do recorte
			flappyBird.xcanv,flappyBird.ycanv, //posição do sprite no canvas
			flappyBird.largura,flappyBird.altura,  // tamanho do sprit no canvas
		);
	}
};



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

let TelaAtiva = {};
	function mudaPraTela(novaTela){
		TelaAtiva = novaTela;
	}	


const Telas = {
	INICIO: {
		desenha(){
			planoDeFundo.desenha();
  		chao.desenha();
  		flappyBird.desenha();
			msgIncial.desenha();

		},
		click(){
			mudaPraTela(Telas.JOGO);
		},
		atualiza(){

		}
	}
};

Telas.JOGO = {
	desenha(){
		planoDeFundo.desenha();
  		chao.desenha();
  		flappyBird.desenha();

	},
	atualiza(){
		flappyBird.atualiza();
	}
};


function loop(){ //a ordem faz diferença

	TelaAtiva.desenha();
	TelaAtiva.atualiza();
 	


	requestAnimationFrame(loop);
}
window.addEventListener('click', function(){
	if(TelaAtiva.click){
		TelaAtiva.click();
	}
});

mudaPraTela(Telas.INICIO);
loop();