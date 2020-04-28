let tamanho = 0;
let botoes = [];
var timer;
var data = new Date();
var pontuacao = 0;


function endGame(){
    botoes2 = document.querySelectorAll('button.botao');
    
    botoes2 = Array.prototype.slice.call(botoes2)
    botoes2.map( item=>{
        x = parseInt(item.getAttribute('x'));
        y = parseInt(item.getAttribute('y'));
        if(botoes[x][y].tipo == 'bomba'){
            item.innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>';
        }
    });
    botoes = []
}

function addBombas(nBombas){
    let i=0; 
    while(i<nBombas){
        x = (Math.random()*9).toFixed(0);
        y = (Math.random()*9).toFixed(0);
        tipo = botoes[x][y].tipo;
        if(tipo != "bomba"){
            botoes[x][y].tipo = "bomba";
        
            if(x==0){
                r = 0;
                r2 = parseInt(x)+1
            }else if(x==nBombas-1){
                r = x-1;
                r2 = nBombas-1
            }else{
                r = x-1;
                r2 = parseInt(x)+1
            }
            
            if(y==0){
                c = 0
                c2 = parseInt(y)+1
            }else if(y==nBombas-1){
                c = y-1
                c2 = nBombas-1
            }else{
                c = y-1
                c2 = parseInt(y)+1
            }
            
            for(let j=r; j<=r2; j++){
                for(let k=c; k<=c2; k++){
                    if(j!=x || k!=y)
                    botoes[j][k].pontos++;
                }
            }
            
            
            i++;
        }
    }
}

function gerarArena(tamanho){
    for(let i=0; i<tamanho; i++){
        listaBotoes = [];
        listaDivs = [];
        
        for(let j=0; j<tamanho; j++){
            
            botao = document.createElement("button");
            botao.className = "botao";
            botao.setAttribute('x', i);
            botao.setAttribute('y', j);
            botao.innerHTML = '<br>';
            
            botao.style.color = botao.style.backgroundColor;
            
            botao.addEventListener('mousedown', (e)=>{
                if(e.target.tagName != "BUTTON"){
                    elemento = e.target.closest('.botao');
                }else{
                    elemento = e.target;
                }
                if(e.button==2){
                    if(e.target.tagName != "BUTTON"){
                        elemento = e.target.closest('.botao');
                    }else{
                        elemento = e.target;
                    }
                    if(elemento.classList.contains('flag')){
                        elemento.classList.remove('flag');
                        elemento.innerHTML = '<br>';
                    }else{
                        x = elemento.getAttribute('x');
                        y = elemento.getAttribute('y');
                        if(!elemento.classList.contains('clicado')){
                            elemento.classList.add('flag');
                            elemento.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
                        }
                    }
                }else{
                    let x = elemento.getAttribute('x');
                    let y = elemento.getAttribute('y');
                    tipo = botoes[x][y].tipo;
                    pontos = botoes[x][y].pontos;
                    if(tipo == 'bomba'){
                        elemento.style.background = 'red';
                        elemento.innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>';
                        endGame();
                    }else if(pontos!=''){
                        elemento.innerHTML = botoes[x][y].pontos;
                        pontuacao += botoes[x][y].pontos;
                        document.querySelector(".labelPontos").innerHTML = pontuacao;
                    }else{
                        elemento.classList.add('clicado');
                        elemento.innerHTML = '<br>';
                    }
                }
            });
            
            listaDivs.push(botao);
            
            listaBotoes.push({
                x: i,
                y: j,
                tipo: 'comum',
                pontos: ''
            });
            
        }
        listaDivs.map(item=>{
             document.querySelector(".div-botoes").appendChild(item);
        });
        br = document.createElement("br");
        document.querySelector(".div-botoes").appendChild(br);
        botoes.push(listaBotoes);
    }
    document.querySelector(".labelBombas").innerHTML = tamanho;
    addBombas(tamanho)
}

document.querySelector("#jogar").addEventListener('click', (e)=>{
    tamanho = document.querySelector("#selectTamanho").value;
    document.querySelector(".home").className += " d-none";
    document.querySelector(".game").className -= "d-none";
    if(tamanho==15){
        document.querySelector(".div-botoes").style.width = "700px";
    }
    gerarArena(tamanho)
});

