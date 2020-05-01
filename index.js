let tamanho = 0;
let botoes = [];
var timer;
var data = new Date();
var pontuacao = 0;
var gameover = false;
var botoesClicaveis = 0;
var botoesClicados = 0;
var fase = 1;

function navegar(destino){
    section = document.querySelector('section.ativa');
    section.style.opacity = 0;
    section.classList.remove("ativa");
    setTimeout(()=>{
        section.style.display = "none";
    }, 500);
    
    sectionDestino = document.querySelector(destino);
    sectionDestino.style.opacity = 0;
    sectionDestino.style.display = "block";
    sectionDestino.classList.add("ativa");
    setTimeout(()=>{
        sectionDestino.style.opacity = 1;
    }, 500)
}

function converterListaToMap(lista){
    return Array.prototype.slice.call(lista);
}

function resetArena(){
    document.querySelector(".div-botoes").innerHTML = '';
    gameover = false;
    pontuacao = 0;
    botoes = [];
    botoesClicaveis = 0;
    botoesClicados = 0;
    gerarArena(10);
}

function gerarPremio(){
    botao = document.querySelector('naoclicado');
    x = botao.getAttribute('x');
    y = botao.getAttribute('y');
    botoes[x][y].tipo = 'premio';
}

function gameOver(){
    botoes2 = document.querySelectorAll('button.botao');
    botoes2 = Array.prototype.slice.call(botoes2)
    botoes2.map( item=>{
        x = parseInt(item.getAttribute('x'));
        y = parseInt(item.getAttribute('y'));
        if(botoes[x][y].tipo == 'bomba'){
            item.innerHTML = '<i class="fas fa-virus"></i>';
        }
        item.removeEventListener('mousedown', (e)=>{return false}, false);
    });
    botoes = [];
    gameover = true;
}
//botoesClicados++;
function leftClick(elemento){
    if(elemento.classList.contains('naoclicado')){
        let x = elemento.getAttribute('x');
        let y = elemento.getAttribute('y');
        let pontos = botoes[x][y].pontos;
        if(pontos!=''){
            elemento.innerHTML = botoes[x][y].pontos;
            pontuacao += botoes[x][y].pontos;
            document.querySelector(".labelPontos").setAttribute('value', pontuacao);
        }else{
            elemento.style.background = 'white';
            elemento.innerHTML = '<br>';
        }
        elemento.classList.remove('naoclicado');
        botoesClicados++;
        if(botoesClicados==botoesClicaveis-1){
            gerarPremio();
        }
    }
}
function rightClick(elemento){
    if(elemento.classList.contains('flag')){
        elemento.classList.remove('flag');
        elemento.innerHTML = '<br>';
    }else{
        x = elemento.getAttribute('x');
        y = elemento.getAttribute('y');
        if(elemento.classList.contains('naoclicado')){
            elemento.classList.add('flag');
            elemento.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
        }
    }
}
function bombaClick(elemento){
    elemento.style.background = 'green';
    elemento.innerHTML = '<i class="fas fa-virus"></i>';
    gameOver();
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
            botao.className = "botao naoclicado";
            botao.setAttribute('x', i);
            botao.setAttribute('y', j);
            botao.innerHTML = '<br>';
            
            botao.style.color = botao.style.backgroundColor;

            botao.addEventListener('mousedown', (e)=>{
                if(gameover==false){
                    //definindo elemento clicado
                    if(e.target.tagName != "BUTTON"){
                        elemento = e.target.closest('.botao');
                    }else{
                        elemento = e.target;
                    }
                    
                    if(e.button==2){
                        rightClick(elemento)
                    }else{
                        let x = elemento.getAttribute('x');
                        let y = elemento.getAttribute('y');
                        tipo = botoes[x][y].tipo;
                        if(tipo == 'bomba'){
                            bombaClick(elemento)
                        }else{
                            leftClick(elemento)
                        }
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
    document.querySelector(".labelBombas").setAttribute('value', tamanho);
    botoesClicaveis = (tamanho*tamanho)-tamanho;
    addBombas(tamanho)
}

botoesJogar = converterListaToMap(document.querySelectorAll(".jogar"));
botoesJogar.map(item=>{
    item.addEventListener('click', (e)=>{
        //tamanho = document.querySelector("#selectTamanho").value;
        resetArena();
        navegar("section.game")
    });
})
document.querySelector(".comoJogar").addEventListener('click', (e)=>{
    navegar("section.tutorial")
});
