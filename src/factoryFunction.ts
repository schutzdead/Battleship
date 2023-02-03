export const ship = (size:number, boat:number[]=[0,0], impacted:number=0, isSunk:boolean=false) => {

    return {
      size,
      impacted,
      isSunk,
      boat
      }
  }
  
  
export const gameBoard = () => {
    
  let hitPosition:number[] = [];
  let sunkPosition:number[] = [];

  var randomX:number = 0
  var randomY:number = 0

function defineX (shipSize:number, isVertical:boolean) {
  if(shipSize>4) console.log(isVertical);
  if(isVertical){
    randomX = Math.floor(Math.random() * (11 - 1) + 1);
    if(shipSize>4) console.log(randomX);
    if(shipSize>4) console.log(randomX);
    return randomX
  } else {
    randomX = Math.floor(Math.random() * ((11-shipSize) - 1) + 1); 
    if(shipSize>4) console.log(randomX);
    if(shipSize>4) console.log(randomX);
    return randomX
  }
}

function defineY (shipSize:number, isVertical:boolean) {
  if(shipSize>4) console.log(isVertical);
  if(isVertical){
    randomY = Math.floor(Math.random() * ((11-shipSize) - 1) + 1);
    if(shipSize>4) console.log(randomY);
    if(shipSize>4) console.log(randomY);
    return randomY
  } else {
    randomY = Math.floor(Math.random() * (11 - 1) + 1);
    if(shipSize>4) console.log(randomY);
    if(shipSize>4) console.log(randomY);
    return randomY
  }
}

  function random10(shipSize:number){
      let isVertical:boolean = false;
      if(Math.random()>0.49) isVertical = true; //fifty-fifty to be true or not
      // if(isVertical){
      //     randomX = Math.floor(Math.random() * (11 - 1) + 1); //generate alea between 10 and 1
      //     randomY = Math.floor(Math.random() * ((11-shipSize) - 1) + 1); // less shipSize to have off map
      //     if(shipSize>3) console.log(randomX,randomY);   
      // } else {
      //     randomX = Math.floor(Math.random() * ((11-shipSize) - 1) + 1); 
      //     randomY = Math.floor(Math.random() * (11 - 1) + 1);
      // }
     
      return {
        firstPos : [defineX(shipSize, isVertical),defineY(shipSize, isVertical)], orientation:isVertical}
  }
  
  //initial square of the boat (vertical or not, first square is the same)
  function firstBoatSquare (firstPos:number[]) {
    let boat = [firstPos[0] + ((firstPos[1]-1)*10)]
    return boat
  }
      
  //generate all square of the boat + one more at the end (to create a barrier for other boat)
  const factoFunction = (shipSize:number, boat:number[], firstPos:number[], whatsEnd:number) => {
    for(let i=1; i<=shipSize; i++){
      boat.push(firstPos[0] + (((firstPos[1]-1)*10)) + (i * whatsEnd))
    } 
  }
  
  //if boat is vertical, genetare all other square around the boat to protect him
  const sideVertical = (shipSize:number, boat:number[], firstPos:number[], whatsEnd:number) => {
    boat.push(firstPos[0] + (((firstPos[1]-1)*10)) + (-whatsEnd)) //square before the boat
    for(let i=0; i<shipSize; i++){
      boat.push(firstPos[0]-1 + (((firstPos[1]-1)*10)) + (i * whatsEnd))
      boat.push(firstPos[0]+1 + (((firstPos[1]-1)*10)) + (i * whatsEnd))
    } 
  }

  //same if boat is horizontal
  const sideHorizontal = (shipSize:number, boat:number[], firstPos:number[], whatsEnd:number) => {
    boat.push(firstPos[0] + (((firstPos[1]-1)*10)) + (-whatsEnd))
    for(let i=0; i<shipSize; i++){
        boat.push(firstPos[0] + (((firstPos[1]-2)*10)) + (i * whatsEnd))
        boat.push(firstPos[0] + (((firstPos[1])*10)) + (i * whatsEnd))
    } 
  }

  function lastBoatsquare (firstPos:number[], isVertical:boolean, shipSize:number, boat:number[]){
      // let tooCloseVertical = firstPos[1]+shipSize      
      // let tooCloseHorizontal = firstPos[0]+shipSize
      
      
      //check if the boat is n
      if(isVertical){
          // if(tooCloseVertical>10) {
          //   console.log('yes');
            
          //     factoFunction(shipSize, boat, firstPos, -10)
          //     sideVertical(shipSize, boat, firstPos, -10)
          //   } else {
              factoFunction(shipSize, boat, firstPos, 10)
              sideVertical(shipSize, boat, firstPos, 10)
          // }
      } else {
          // if(tooCloseHorizontal>10) {
            // console.log('yes');
              // factoFunction(shipSize, boat, firstPos, -1)
              // sideHorizontal(shipSize, boat, firstPos, -1)
          // } else {
              factoFunction(shipSize, boat, firstPos, 1)
              sideHorizontal(shipSize, boat, firstPos, 1)
          // }
      } 
      if(shipSize>4) console.log(boat);
      
      let realBoat = boat.slice(0,shipSize);
      
      return {boatAndSide:boat.sort((first,last) => first-last), realBoat:realBoat}
  }
    
    const fullPos = (shipSize:number) => {

      const generateRandom = random10(shipSize)
      const startPos = generateRandom.firstPos
      const orient = generateRandom.orientation  
      
      const boat = firstBoatSquare(startPos)
      return lastBoatsquare(startPos, orient, shipSize, boat);
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
  
    return {
      random10,
      firstBoatSquare,
      lastBoatsquare,
      fullPos,
      receiveAttack,
    }
  }