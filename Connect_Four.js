var player1 = prompt('Player1 : Enter your name: \nYour Color Is Blue');
var player1_color = 'rgb(0, 0, 255)';

var player2 = prompt('Player2 : Enter your name: \nYour Color Is Orange');
var player2_color = 'rgb(255, 165, 0)';

var gameOn = true;
var table = $('table tr');
var gray = 'rgb(239, 239, 239)';

function changeColor(row,col,color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color',color);
}

function returnColor(row,col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function reportWin(row,col){
  console.log('Win combination : ');
  console.log(row);
  console.log(col);
}

function checkBottom(col){
  for (var row = 5; row>=0; row--){
    if (returnColor(row,col) == gray) {
      return row;
    }
  }
}

function colorMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== gray && one !== undefined);
}

function verticalWin() {
  for (var row = 0; row <3; row++){
    for (var col = 0; col < 7; col++) {
      if (colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))) {
        console.log('Vertical');
        reportWin(row,col);
        $('h3').text('Congratulations!!');
        return true;
      }
    }
  }
}

function horizontalWin() {
  for (var col = 0; col <4; col++){
    for (var row = 0; row < 6; row++) {
      if (colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))) {
        reportWin(row,col);
        console.log('Horizontal');
        $('h3').text('Congratulations!!');
        return true;
      }
    }
  }
}

function diagonalWin() {
  for (var row = 0; row <3; row++){
    for (var col = 0; col < 7; col++) {
      //matching along negative slop
      if (colorMatch(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))) {
        reportWin(row,col);
        console.log('Diagonal');
        $('h3').text('Congratulations!!');
        return true;
      }
      //maching along positive slop
      if (colorMatch(returnColor(row,col),returnColor(row+1,col-1),returnColor(row+2,col-2),returnColor(row+3,col-3))) {
        reportWin(row,col);
        console.log('Diagonal');
        $('h3').text('Congratulations!!');
        return true;
      }
    }
  }
}

//Start the Game
var currentplayer = 1;
var playername = player1;
var playercolor = player1_color;
$('h3').text(playername+', its your turn...');
$('.board button').on('click',function() {
  if (gameOn) {
    var col = $(this).closest('td').index();

    var bottom = checkBottom(col);
    // console.log(col+' '+bottom);
    changeColor(bottom,col,playercolor);

    if(horizontalWin() || verticalWin() || diagonalWin()){
      $('h1').text(playername+' has won the Game!');
      $('h1').css('color','red');
      $('h3').fadeOut(15000);
      gameOn = false;
      alert('Refresh To Play again');
    }

    if(currentplayer === 1){
      currentplayer = 2;
      playername = player2;
      playercolor = player2_color;
    }else {
      currentplayer = 1;
      playername = player1;
      playercolor = player1_color;
    }
    $('h3').text(playername+', its your turn...');
  }

})
