//CUSTOMIZABLES
var BallSpeed = 3 //default 3
var playerLength = 3 //default 3
var playerSpeed = 2 //default 2
var variation = 2 //dfefault 2
//CUSTOMIZABLES




alert("Pong! press W and S to move player 1 up and down, to do AI v AI press q, to do multiplayer, press the UP or DOWN, you can also use those keys to control player 2, to do 1 player, press E. In script.js there is some variables to mess around with")
function full_screen()
{
  // check if user allows full screen of elements. This can be enabled or disabled in browser config. By default its enabled.
  //its also used to check if browser supports full screen api.
  if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) 
  {
    if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
    {


      var element = document.getElementById("fullScreen")
      //requestFullscreen is used to display an element in full screen mode.
      if("requestFullscreen" in element) 
      {
        element.requestFullscreen();
      } 
      else if ("webkitRequestFullscreen" in element) 
      {
        element.webkitRequestFullscreen();
      } 
      else if ("mozRequestFullScreen" in element) 
      {
        element.mozRequestFullScreen();
      } 
      else if ("msRequestFullscreen" in element) 
      {
        element.msRequestFullscreen();
      }




    }
  }
  else
  {
    alert("Y U NO GET FULLSCREEN!?!?!")
  }
}






var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var players  = 1
var time = 0
var plr1 = 250-playerLength*5
var plr2 = 250-playerLength*5
var Up1 = false
var Down1 = false
var Up2 = false
var Down2 = false
var ballX = 250
var ballVert = 0
var ballHorz = BallSpeed
var pause = false
var P1Score = 0
var P2Score = 0
var ballY = 250
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
setInterval(function(){
  time ++
  if(pause == false){
    if(players <= 1){
      if(ballY > plr2 + playerLength*5-5 && ballX > 125){
        plr2 += playerSpeed
      }
      if(ballY < plr2 + playerLength*5-5 && ballX > 125){
        plr2 -= playerSpeed
      }
    }
    if(players == 0){
      if(ballY > plr1 + playerLength*5-5 && ballX < 375){
        plr1 += playerSpeed
      }
      if(ballY < plr1 + playerLength*5-5 && ballX < 375){
        plr1 -= playerSpeed
      }
    }
    ballX += ballHorz
    ballY += ballVert
    if(ballX <= 0){
      P2Score ++
      plr1 = 250-playerLength*5
      plr2 = 250-playerLength*5
      ballY = 250
      ballVert = 0
      ballHorz = BallSpeed *-1
      ballX = 250
      Up1 = false
      Up2 = false
      Down1 = false
      Down2 = false
      //alert("player 2 wins and has "+P2Score+" points")
    }
    if(ballX >= 490){
      P1Score ++
      ballY = 250
      ballVert = 0
      ballHorz = BallSpeed
      ballX = 250
      plr1 = 250-playerLength*5
      plr2 = 250-playerLength*5
      Up1 = false
      Up2 = false
      Down1 = false
      Down2 = false
      //alert("player 1 wins and has "+P1Score+" points")
    }
    if(ballY >= plr1-9 && ballY<=plr1+playerLength*10&& ballX <=10){
      ballHorz = ballHorz *-1
      ballVert = getRandomInt(variation*2+1)-variation
    }
    if(ballY >= plr2-9 && ballY<=plr2+playerLength*10&& ballX >=480){
      ballHorz = ballHorz *-1
      ballVert = getRandomInt(variation*2+1)-variation
    }
    if(ballY <= 0||ballY >=490){
      ballVert = ballVert *-1
    }

    if(Up1 == true){
      plr1 -= playerSpeed
    }
    if(Down1 == true){
      plr1 += playerSpeed
    }
    if(Up2 == true){
      plr2 -= playerSpeed
    }
    if(Down2 == true){
      plr2 += playerSpeed
    }
  }
  ctx.font = "30px Sans"
  ctx.clearRect(0,0,500,500)
  ctx.fillRect(10,plr1,10,playerLength*10)
  ctx.fillRect(480,plr2,10,playerLength*10)
  ctx.fillRect(ballX, ballY,10,10)
  ctx.fillText(P1Score.toString()+":"+P2Score.toString(),225,30,40)
  if(time % 3600==0){
    BallSpeed += 1
    playerLength += 1
    playerSpeed += 1
    variation += 0.5
  }
},1000/60)
document.onkeydown = function(e){
  e=e||window.event
  if(e.keyCode == 81){
    players = 0
  }
  if(e.keyCode == 69){
    players = 1
  }
  if(e.keyCode == 70){
    full_screen()
  }
  if(e.keyCode == 32){
    BallSpeed = 3 //default 3
    playerLength = 3 //default 3
    playerSpeed = 2 //default 2
    variation = 2 //dfefault 2
    P1Score = 0
    plr1 = 250-playerLength*5
    plr2 = 250-playerLength*5
    ballY = 250
    ballVert = 0
    ballHorz = BallSpeed *-1
    ballX = 250
    P2Score = 0
  }
  if(e.keyCode == 80){
    if(pause == false){
      pause = true
    }else{
      pause = false
    }
  }
  if(e.keyCode == 87){
    Up1 = true
    if(players==0){
      players = 1
    }
  }
  if(e.keyCode == 83){
    Down1 = true
    if(players==0){
      players = 1
    }
  }
  if(e.keyCode == 38){
    Up2 = true
    players = 2
  }
  if(e.keyCode == 40){
    Down2 = true
    players = 2
  }
}
document.onkeyup = function(e){
  if(e.keyCode == 87){
    Up1 = false
  }
  if(e.keyCode == 83){
    Down1 = false
  }
  if(e.keyCode == 38){
    Up2 = false
  }
  if(e.keyCode == 40){
    Down2 = false
  }
}
