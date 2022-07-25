const buttons = ['green','yellow','blue','red'];

var machine_colors = [];
var user_colors = [];

var clickButton = function(){
    
    $('.btn').click(function(event){
       
        var btnColor = document.querySelector('#'+event.target.id);
        var audio = new Audio(`sounds/${event.target.id}.mp3`);
       
        btnColor.classList.add('pressed');
        user_colors.push(event.target.id);
        audio.play();

        setTimeout(function(){btnColor.classList.remove('pressed')},100);
        color = event.target.id;
    })
}

var randomPlay = function() {
    
    var randomColor = buttons[Math.floor(Math.random()*buttons.length)];
    
    document.querySelector('#'+randomColor).classList.add('pressed');
    setTimeout(() => {document.querySelector('#'+randomColor).classList.remove('pressed')},500);
    machine_colors.push(randomColor);
}

var simonGame = function() {

    var counter = 1;

    $(document).keypress(function(event){
        if (event.key == 'a') {
            $('h1').text(`Level ${machine_colors.length + counter}`);

            randomPlay();
            clickButton();
        }
    
        $('.btn').click(function(){
            if (user_colors[user_colors.length - 1] == machine_colors[user_colors.length - 1]) {
                
                if (user_colors.length == machine_colors.length) {
                    user_colors = [];
                    counter += 1;
                    $('h1').text(`Level ${counter}`);
                    setTimeout(randomPlay,500);
                }
            } else {
                var wrong = new Audio('sounds/wrong.mp3');

                $('h1').text('Wrong! Game Over, CTRL + R to try again!');
                $('body').addClass('game-over');
                setTimeout(function(){$("body").removeClass("game-over");}, 400);
                wrong.play();
            }
        })

    })
        
}

simonGame();
