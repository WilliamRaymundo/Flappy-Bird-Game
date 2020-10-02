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



function loop(){ //a ordem faz diferença
	flappyBird.atualiza();
	  planoDeFundo.desenha();
  chao.desenha();
  flappyBird.desenha();



	requestAnimationFrame(loop);
}
loop();