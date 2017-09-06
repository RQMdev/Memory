const NUMBER_OF_IMAGE_AVAILABLE = 59,
      LOCKED_ANIMATION_TIME = 1000,
      SHOW_TIME = 1000;

var tileWrapper = document.getElementById('tile-wrapper');
var tiles = [];

var game = {
  click: 0,
  tilesUp: 0,
  score: 0,
  iteration: 0,
  numberOfTiles: 128,

  createGame: function(tilesNumber){
    var i = 0;
    while ( i < tilesNumber ) {
      var randomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGE_AVAILABLE);
      tiles.push(new Tile( randomNumber, i));
      i++;
      tiles.push(new Tile( randomNumber, i));
      i++;
    }
  },

  shuffleTiles: function(tilesNumber){
    var j = 0;
    var arr = [];
    while ( j < tilesNumber+1 ){
      arr.push(j++);
    }

    var i = 0;
    while ( i < tilesNumber ) {
      var order = Math.floor(Math.random() * arr.length );
      $('#'+i).css('order', order );
      i++;
    }
  },

  resetTiles: function(){
    tiles.splice(0, tiles.length);
    while (tileWrapper.firstChild){
      tileWrapper.removeChild(tileWrapper.firstChild);
    }
  },
  animateTiles: function(){
    function doSetTimeout(i, time){
      setTimeout(function(){
        $('#tile-wrapper .tile:nth-child('+ i +')').css('z-index', 10 + i).addClass('start-game-animation');
      }, time);
    }
    for (var i = 1; i <= tiles.length; i++){
      var time = 100 * i;
      doSetTimeout(i, time);
    }

  }
}

class Tile {
  constructor(imgNumber, id){
    this.number = imgNumber;
    this.id = id;
    this.locked = false;
    this.flipped = false;
    this.image = 'img/'+ imgNumber +'.svg';

    var current = this;

    // Generate DOM element corresponding to Object
    $('<div id="'+ this.id +'" class="tile"></div>').appendTo('#tile-wrapper');
    $('<div class="card"></div>').appendTo('#'+ this.id);
    $('<figure class="back"></figure>').appendTo('#'+ this.id +' .card');
    $('<figure class="front"></figure>').appendTo('#'+ this.id +' .card');
    $('<img src="'+ this.image +'" class="svg">').appendTo('#'+ this.id +' .card .front');

    $('#'+ this.id).click(function(){
      if ( !$('#'+ this.id +' .card').hasClass('flipped') ){
        game.tilesUp += 1;
        game.click += 1;
      }
      $('#'+ this.id +' .card').addClass('flipped');
      this.flipped = true;
      if (game.tilesUp >= 2){
        var temp = {};
        $('.flipped').parent().each(function(){
          game.iteration++;
          var tempId = this.id;
          if ( tiles[tempId].number == temp.number){
            $('.flipped').css('transition', LOCKED_ANIMATION_TIME +'ms ease-out').addClass('locked').removeClass('flipped');
            tiles[tempId].locked = true;
            tiles[tempId].flipped = false;
            temp.locked = true;
            temp.flipped = false;
            game.tilesUp = 0;
            game.iteration = 0;
            game.score++;
          } else if (game.iteration == 2){
            $('.flipped').addClass('waiting').removeClass('flipped');
            setTimeout(function(){
              $('.waiting').removeClass('waiting');
            }, SHOW_TIME);
            game.tilesUp = 0;
            game.iteration = 0;
          } else {
            temp = tiles[tempId];
          }
        });
      }

      function doSetTimeout(i, time){
        setTimeout(function(){
          $('#tile-wrapper .tile:nth-child('+ i +')').css('z-index', 500 - i).addClass('end-game-animation');
        }, time);
      }

      var count = 0;
      tiles.forEach(function(tile){
        if (tile.locked) {
          count++;
        }
        if (count == tiles.length){
          for (var i = 1; i <= tiles.length; i++){
            var time = 1000 + (100 * i);

            doSetTimeout(i, time);
          }
        }
      });

    });
  }
}

$('#easy').click(function(){
  game.resetTiles();
  game.numberOfTiles = 16;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
  game.animateTiles();
});

$('#medium').click(function(){
  game.resetTiles();
  game.numberOfTiles = 32;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
  game.animateTiles();
});

$('#hard').click(function(){
  game.resetTiles();
  game.numberOfTiles = 64;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
  game.animateTiles();
});
