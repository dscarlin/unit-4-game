function set(){
    var info = {
        characterArray : 
        [{
            name: "Frodo",
            image: 'assets/images/Frodo.png',
            healthPower: 180,
            attackPower: 10,
            counterAttackPower: 10
        },
        {
            name: "Gandalf",
            image: "assets/images/Gandalf.jpg",
            healthPower: 130,
            attackPower: 25,
            counterAttackPower: 25
        },
        {
            name: "Aragorn",
            image: "assets/images/Aragorn.jpg",
            healthPower: 160,
            attackPower: 20,
            counterAttackPower: 20
        },
        {
            name: "Sauron",
            image: "assets/images/Sauron.jpg",
            healthPower: 110,
            attackPower: 30,
            counterAttackPower: 30
        },
        {
            name: "Gollum",
            image: "assets/images/Gollum.jpg",
            healthPower: 100,
            attackPower: 12,    
            counterAttackPower: 20
        },
        {
            name: "Gimli",
            image: "assets/images/Gimli.jpeg",
            healthPower: 110,
            attackPower: 20,
            counterAttackPower: 20
        }],
        yourCharacter: null,
        currentEnemy: null,
        // lastEnemy: null,
        currentAttackPower: 0,
        // winOccurred: false
        };
    
//------------- jquery global variables -----------//

var $characterOptions = $('#charOptions');
var $yourCharacter = $('#yourCharacter');
var $enemies = $('#enemies');
var $defender = $('#defender');
var $attack = $('#attack');//button
var $fight = $('#fight');//text


//-------------- reset board -----------------------//
$yourCharacter.empty()
$enemies.empty()
$defender.empty()
$fight.empty()
 


//-------------- funcs --------------------------------//

        function makeCharacters(character, index) {
            var card = $('<div>').attr('class','card bg-white').attr('data-index', index);
            var name = $('<p>').text(character.name);
            var img = $('<img>').attr('class','picture').attr('src', character.image);
            var health = $('<p>').text(character.healthPower).attr('id',character.name);
            card.append(name ,img ,health);
            $characterOptions.append(card);
            }

        function chooseCharacter(){
            var card = $(this); 
            var index = card.attr('data-index');
            card.remove().attr('class','card character');
            $yourCharacter.append(card);
            info.yourCharacter = info.characterArray[index]; 
            stack = $(".bg-white").remove().attr('class','card bg-red');
            $enemies.append(stack);
            $characterOptions.off();
            info.currentAttackPower = info.yourCharacter.attackPower;
            $characterOptions.off();   
            play()          
            }

//makes card for each character from character array in info
info.characterArray.forEach(makeCharacters);

//click event one time to select your character
$characterOptions.one('click','.card', chooseCharacter)
//section of the game that will repeat    

function play(){  
   
    $enemies.one('click',".bg-red",function(){
        $fight.empty();
        var card = $(this) 
        var index = card.attr('data-index')
        
        info.currentEnemy = info.characterArray[index];
        card.remove().attr('class','card bg-black')
        $defender.append(card)
    });

$attack.on('click',function attack(){
    
    if (info.yourCharacter && info.currentEnemy){
        $attack.off();
        var fightMessage = 

            "You attacked " + info.currentEnemy.name + " for " + 
            info.currentAttackPower + " damage. <br>" + 

            info.currentEnemy.name + " attacked you back for " + 
            info.currentEnemy.counterAttackPower + " damage.<br><br>";

        var winMessage = 

            "You have defeated " + info.currentEnemy.name + 
            ",<br> you can choose to fight another Enemy";

        var loseMessage = 

            "You have been defeated... Game Over.<br>";

        var tieMessage = 

            "Unfortunately you suffered a terminal" +
            " blow<br> while defeating " + info.currentEnemy.name +
            "... Game Over.<br>"

        var winGameMessage = 

            "Congratulations you have rid middle earth of your Enemies<br>"

        $fight.html(fightMessage);
        info.yourCharacter.healthPower -= info.currentEnemy.counterAttackPower;
        info.currentEnemy.healthPower -= info.currentAttackPower;
        $('#'+info.yourCharacter.name).text(info.yourCharacter.healthPower); 
        $('#'+info.currentEnemy.name).text(info.currentEnemy.healthPower);
        //increment attack power
        info.currentAttackPower += info.yourCharacter.attackPower;
    
        if (info.yourCharacter.healthPower <= 0){
            if (info.currentEnemy.healthPower <=0){
                $fight.html(tieMessage);
                $defender.empty();
            }
            else{
                $fight.html(loseMessage);
            }
            
            
            $yourCharacter.empty();
            info.yourCharacter = null;
            // attack.off()
            var restart = $('<button>').on('click', function(){
                set(); //clear divs
                return false;
            })
            info.currentEnemy.healthPower = 1
            restart.html("Restart");
            $fight.append(restart);
          
            }   
        if (info.currentEnemy.healthPower <= 0){
            if ($enemies.children().length == 0){
                $fight.html(winGameMessage)
                var restart = $('<button>').on('click', function(){
                    set(); //clear divs
                    return false   
                })
                restart.html("Restart");
                $fight.append(restart);   
            } 
            else{
                $fight.append(winMessage);
            }
            $defender.empty();
            info.currentEnemy = null;
            play();
            return false;
            }   
        
            
        $attack.on('click',attack);
        }

})

}
}
$(document).ready(function(){
    set();
    $('body').backstretch(['assets/images/waterfallbkg.png','assets/images/mordorbkg.jpg','assets/images/middleEarthbkg.jpg','assets/images/middleEarth2bkg.jpg','assets/images/hobbitbkg.jpg','assets/images/bridgebkg.jpg'],{duration: 10000, fade:900 })
   
})

    

