'use strict';

var gBoard;
var gLevel = 1;
var chartType;
function initGame() {

    gBoard = buildBoard(chartType);
    document.querySelector('.board').style.display = 'block';
    startGame(gBoard);
}
function getChartType(type) {
    chartType = type;   
    document.querySelector('.chartType').style.display = 'none';   
    initGame();
    addDragToAns();
}
function buildBoard(chartType) {
    var arrayBoard = [];
    var start = chartType;
    
    for(var i = start ;i <= 9   ;i++){
        arrayBoard[i] = [];
        for(var j = start ;j < start+10 ;j++ ){
            arrayBoard[i][j] = i*10 + j;
        }
    }
    
    return arrayBoard;
}
    
 function  addDragToAns() {
        $( "#answer td" ).draggable({opacity : .7 , revert:'invalid'});
  }
 function drgeAnsw(answCell){
     console.log('==========');
     
     var row = answCell.getAttribute('data-row');
     var colm = answCell.getAttribute('data-colm');
      $("#tableGame [data-row='"+row+"'][data-colm='"+colm+"']" ).droppable({
        
        drop: function( event, ui ) {
            var x =$("#tableGame [data-row='"+row+"'][data-colm='"+colm+"']" ); 
            console.log(x.innerHTML) 
             x.attr('style', 'visibility : "visible"')
             var ans = $(answCell);
             ans.attr('style', 'visibility : "hidden"') 
        }
        });
 }
    
function startGame(board) {
    var gameBoard = board;
    for(var i = 0 ;i < gameBoard.length ;i++){
        renderRow(i, gameBoard);
        randCell(i);
        playRow(i);
    }
}
function renderRow(row , board) {
    var elRow = document.createElement('tr');
    for(var i = 0; i < board[row].length; i++){
        
        var elTd = document.createElement('td');
        elTd.innerHTML = board[row][i];
        var className = i % 2 === 0? 'even' : 'odd';
        elTd.setAttribute('class', className);
        elTd.setAttribute('data-row', row);
        elTd.setAttribute('data-colm', i);
        elTd.setAttribute('onclick', 'f(this)');
       
        
        // elTd.setAttribute('onclick', 'f(this)');
        elRow.appendChild(elTd);
    }
    document.querySelector('#tableGame').appendChild(elRow);
}
function randCell(row) {
    var rand1 = Math.floor(Math.random()*10);
    var rand2 = Math.floor(Math.random()*10);
    
}

function playRow(row) {
    var arryMissNum = [];
    arryMissNum.push(randCell(row)); 
    arryMissNum.push(randCell(row));
       renderAnswers(arryMissNum);
    if(userTurn()) return true; 
}
function randCell(row) {
 
    var rand = Math.floor(Math.random()*10);
 
    var st = "[data-row= '"+row +"'][data-colm='"+ rand+"']";
    var cell = document.querySelector(st);
    
    cell.style.visibility= 'hidden';
    return cell;
}
function renderAnswers(answers) {
    var tblAnswer = document.querySelector('#answer');
    for(var i = 0; i < answers.length ;i++){
        var a =answers[i].cloneNode(true);
        a.style.visibility = 'visible';
        a.setAttribute('onclick' , 'drgeAnsw(this)');
        tblAnswer.appendChild(a);
    }
}

function userTurn() {
    var flag = false;
    setTimeout(function () {
        flag = true;
    }, 10000)
    return flag;
}