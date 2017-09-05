const NUMBER_OF_IMAGE_AVAILABLE = 62,
      LOCKED_ANIMATION_TIME = 1000,
      SHOW_TIME = 1000;

var game = {
  tilesUp: 0,
  score: 0,
  iteration: 0,
  numberOfTiles: 66,
  createGame: function(tilesNumber){
    var i = 0;
    while ( i < tilesNumber ) {
      var randomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGE_AVAILABLE);
      window['tile'+i] = new Tile( randomNumber, i);
      i++;
      window['tile'+i] = new Tile( randomNumber, i);
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
  }
}

class Tile {
  constructor(imgNumber, id){
    this.number = imgNumber;
    this.id = id;
    this.image = 'img/'+ imgNumber +'.svg';

    var current = this;

    $('<div id="'+ this.id +'" class="tile"></div>').appendTo('#tile-wrapper');
    $('<div class="card"></div>').appendTo('#'+ this.id);
    $('<figure class="back"></figure>').appendTo('#'+ this.id +' .card');
    $('<figure class="front"></figure>').appendTo('#'+ this.id +' .card');
    $('<img src="'+ this.image +'" class="svg">').appendTo('#'+ this.id +' .card .front');
    
    $('#'+ this.id).click(function(){
      if ( !$('#'+ this.id +' .card').hasClass('flipped') ){ game.tilesUp += 1; }
      $('#'+ this.id +' .card').addClass('flipped');
      if (game.tilesUp >= 2){
        var temp = {};
        $('.flipped').parent().each(function(){
          game.iteration++;
          var tempId = this.id;
          if ( window['tile'+ tempId].number == temp){
            $('.flipped').css('transition', LOCKED_ANIMATION_TIME +'ms ease-out').addClass('locked').removeClass('flipped');
            game.tilesUp = 0;
            game.iteration = 0;
            game.score++;
          } else if (game.iteration == 2){
            var flipped = $('.flipped');
            setTimeout(function(){
              flipped.removeClass('flipped');
            }, SHOW_TIME);
            game.tilesUp = 0;
            game.iteration = 0;
          } else {
            temp = window['tile'+ tempId].number;
          }
        });
      }
    });
  }
}

$('#easy').click(function(){
  game.numberOfTiles = 16;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
});

$('#medium').click(function(){
  game.numberOfTiles = 32;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
});

$('#hard').click(function(){
  game.numberOfTiles = 64;
  game.createGame(game.numberOfTiles);
  game.shuffleTiles(game.numberOfTiles);
});
