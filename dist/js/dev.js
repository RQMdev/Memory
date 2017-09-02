var TilesUp = 0,
    score = 0,
    iteration = 0,
    numberOfTiles = 36;

class Tile {
  constructor(imgNumber, id){
    this.number = imgNumber;
    this.id = id;
    this.image = '../img/'+ imgNumber +'.svg';

    var current = this;

    $('<div id="'+ this.id +'" class="tile"></div>').appendTo('#tile-wrapper');
    $('<div class="card"></div>').appendTo('#'+ this.id);
    $('<figure class="back"></figure>').appendTo('#'+ this.id +' .card');
    $('<figure class="front"></figure>').appendTo('#'+ this.id +' .card');
    $('<img src="'+ this.image +'">').appendTo('#'+ this.id +' .card .front');
    $('#'+ this.id).click(function(){
      if ( !$('#'+ this.id +' .card').hasClass('flipped') ){ TilesUp += 1; }
      $('#'+ this.id +' .card').addClass('flipped');
      if (TilesUp >= 2){
        var temp = {};
        $('.flipped').parent().each(function(){
          iteration++;
          var tempId = this.id;
          if ( window['tile'+ tempId].number == temp){
            $('.flipped').css('transition', '1s ease-out').addClass('locked').removeClass('flipped');
            TilesUp = 0;
            iteration = 0;
            score++;
          } else if (iteration == 2){
            var flipped = $('.flipped');
            setTimeout(function(){
              flipped.removeClass('flipped');
            }, 1500);
            TilesUp = 0;
            iteration = 0;

          } else {
            temp = window['tile'+ tempId].number;
          }
        });
      }
    });
  }
}


function createGame() {
  var i = 0;
  while ( i < numberOfTiles ) {
    var randomNumber = Math.floor(Math.random() * 62);
    window['tile'+i] = new Tile( randomNumber, i);
    i++;
    window['tile'+i] = new Tile( randomNumber, i);
    i++;
  }
}
createGame();


function shuffleTiles(){
  var j = 0;
  var arr = [];
  while ( j < numberOfTiles+1 ){
    arr.push(j++);
  }

  var i = 0;
  while ( i < numberOfTiles ) {
    var order = Math.floor(Math.random() * arr.length );
    $('#'+i).css('order', order );
    i++;
  }
}
shuffleTiles();


// var tile1 = new Tile(1, 1);
// var tile2 = new Tile(2, 2);
// var tile3 = new Tile(3, 3);
// var tile4 = new Tile(4, 4);
// var tile5 = new Tile(5, 5);
// var tile6 = new Tile(6, 6);
// var tile7 = new Tile(7, 7);
// var tile8 = new Tile(1, 8);
