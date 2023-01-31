import './style.css'
import { board } from './board'
board();

export const ship = (size:number, boat:number[]=[0,0], impacted:number=0, isSunk:boolean=false) => {

  function hit () {
    //code 
    impacted ++
  }

  function isOut (ship:boolean){
    if(impacted === size){
      ship === true
    }
  }

  return {
    size,
    impacted,
    isSunk,
    hit,
    isOut,
    boat
    }
}

const firstShip = ship(4)


export const gameBoard = () => {
  
  let hitPosition:number[] = [];
  let sunkPosition:number[] = [];

  function random10(shipSize:number){ //generate alea number between 1-10 less size of boat (to stay in range of the map)
    let random = Math.floor(Math.random() * ((10-shipSize) - 1) + 1); 
    let [x,y]: number[] = [random, random];
    let isVertical:boolean = false;
    if(Math.random()>0.49) isVertical = true;
    return {firstPos : [x,y], orientation:isVertical}
  }

  function firstBoatSquare (firstPos:number[], boat:number[]) { //first alea position of the boat
    boat = [firstPos[0] + ((firstPos[1]-1)*10)]
    return boat
  }

  function lastBoatsquare (firstPos:number[], isVertical:boolean, shipSize:number, boat:number[]){ //last alea position of the boat
    let tooCloseVertical = firstPos[1]+shipSize
    let tooCloseHorizontal = firstPos[0]+shipSize
    for(let i=1; i<shipSize; i++){
      if (isVertical) {
        if(tooCloseVertical>10) {
          firstPos[1]-=1
        } else {
          firstPos[1]+=1
        }
      } else {
        if(tooCloseHorizontal>10) {
          firstPos[0]-=1
        } else {
          firstPos[0]+=1
        }
      }
    }
    boat.push(firstPos[0] + ((firstPos[1]-1)*10))
    return boat.sort((first,last) => first-last)
  } 
  
  function animationPosition (boat:number[]) {
    //animation which make color on the pos
  }

  function receiveAttack (target:number, boat:number[]) {
    //target the square on the mouse like boat position
    if(target>=boat[0] && target<=boat[1]) {
      hitPosition.push(target)
      return true
    } else {
      sunkPosition.push(target)
      return false
    }
    //animation for true/false > send sunk ! or not
  }

  function endGame (shipIsSunk:boolean[]) {
    for(let eachShip of shipIsSunk){
      if(eachShip === false) return 'Le jeu continue'
    }
    return 'Fin du jeu'
  }
  
  return {
    random10,
    lastBoatsquare,
    firstBoatSquare,
    animationPosition,
    receiveAttack,
    endGame
  }
}

export const players = () => {
  
  function shoot (targetSquare:number, tries:number[]) {
    let cannonball:number = targetSquare
    for(let eachTry of tries){
      if(eachTry == cannonball) return 'Already hit'
    }
    tries.push(cannonball)
    return 'Nice shoot' //animation on plate
  }
  
  const IA = () => {
    let tries:number[] = []
    let random:number = Math.floor(Math.random() * ((100) - 1) + 1); 
    shoot(random, tries);
  }

  const playerOne= () => {
    let tries:number[] = []
    //add eventlistener
  }

  return {shoot, IA, playerOne}
}