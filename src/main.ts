import './style.css'
import { board } from './board'
import './boatCreation'
import { DOMInteractions} from './boatFleetCreation';

//creation of the each gameboard
board();
//generate boat for each player
var playerBoat = DOMInteractions().createBoats();
var IABoat = DOMInteractions().createBoats();

const start = document.querySelector('.start') as HTMLElement;
const reload = document.querySelector('.reload') as HTMLElement;
const gameBoardPlayer = document.querySelector('.gameBoardPlayer') as HTMLElement
const gameBoardIA = document.querySelector('.gameBoardIA') as HTMLElement

var isUnclickable = true;

function whichButton (startP:string, reloadP:string) {
    start.style.display = startP
    reload.style.display = reloadP
}

reload.addEventListener('click', () => {
    isUnclickable = true;
    gameBoardPlayer.innerHTML = "";
    gameBoardIA.innerHTML = "";
    board();
    playerBoat = DOMInteractions().createBoats();
    IABoat = DOMInteractions().createBoats();
    whichButton('block', 'none')
})

start.addEventListener('click', () => {
    isUnclickable = false;
    DOMInteractions().animationCreateBoat('.gameBoardPlayer>',playerBoat, 'boatSquare')
    DOMInteractions().animationCreateBoat('.gameBoardIA>',IABoat, 'IABoatSquare')
    whichButton('none', 'block')
    toBeClickable();
})

const sunOrNot = (whichBoat:any, squareTarget:number, currentSquare:any) => {
    for(let boat of whichBoat){
        for(let pos of boat.boat){
            if(squareTarget===pos) {
                if(currentSquare.className !== `square${pos} sunk`) boat.impacted += 1
                if(boat.impacted == boat.size) boat.isSunk = true
                currentSquare.classList.add('sunk')
            }
        }
    }   
    if(currentSquare.className !== `square${squareTarget} boatSquare sunk` &&
       currentSquare.className !== `square${squareTarget} IABoatSquare sunk`) currentSquare.classList.add('noHit')
}

const IAsunkOrNot = (square:any) =>{
    let squareNumber = parseInt(square.className.slice(6,8)); 
    sunOrNot(IABoat, squareNumber, square)
}

const aleaShootIA = () => {
    let end:number = 0
    if(end>=99) return
    let random:number = Math.floor(Math.random() * ((100) - 1) + 1); 
    let playerSquare = document.querySelector(`.gameBoardPlayer>.square${random}`) as HTMLElement

    if(playerSquare.className !== `square${random}` && 
       playerSquare.className !== `square${random} boatSquare`) {
        aleaShootIA()
        return
    } else { 
        sunOrNot(playerBoat, random, playerSquare)
        end += 1
    }
}

function playerOrIABoat (whoLose:number, whichBoat:any, endText:string) {
    for(let eachBoat of whichBoat){
        if(eachBoat.isSunk) whoLose += 1       
    }    
    if (whoLose === 4) {
        console.log(endText);
        isUnclickable = true;
    }
}

const toBeClickable = () => {
    var IASquares = document.querySelectorAll('.gameBoardIA>div')
    IASquares.forEach(square => square.addEventListener('click', () => {    
        if(isUnclickable) return 
        let currentSquareNumber = square.className.slice(6,8)
        if(square.className !== `square${currentSquareNumber}` && 
           square.className !== `square${currentSquareNumber}IABoatSquare` &&
           square.className !== `square${currentSquareNumber} IABoatSquare`) return
        
        IAsunkOrNot(square)
        aleaShootIA()
        playerOrIABoat(0, IABoat, 'Quel merguez ce pc')
        playerOrIABoat(0, playerBoat, 'Tu as perdu salaud')
    }));
}
