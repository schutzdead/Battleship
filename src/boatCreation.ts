export const ship = (size:number, boat:number[]=[0,0], impacted:number=0, isSunk:boolean=false) => {
  // used for create a boat as an object
    return {
      size,
      impacted,
      isSunk,
      boat
      }
  }
  
export const boatPosition = () => {

  //generate alea number between 1 et 10
  const randomXY = (VShipSize:number, HShipSize:number, isVertical:boolean) => {
    if(isVertical){
      //withdraw shipSize to avoid to have a boat which is out of the map
      //an example : X is horizontal, so HShipSize = shipSize 
      let XY = Math.floor(Math.random() * (11 - VShipSize - 1) + 1);
      return XY
    } else {
      let XY = Math.floor(Math.random() * (11 - HShipSize - 1) + 1);
      return XY
    }
  }

  function random10(shipSize:number){
      let isVertical:boolean = false;
      if(Math.random()>0.49) isVertical = true; //fifty-fifty to be vertical or not
      return {
        firstPos : 
        [randomXY(0, shipSize, isVertical), //add to firstPos array alea X
        randomXY(shipSize, 0, isVertical)], //idem for Y
        orientation:isVertical
      }
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
      //will execute all fonction above to create the array of the boat 
      if(isVertical){
        factoFunction(shipSize, boat, firstPos, 10)
        sideVertical(shipSize, boat, firstPos, 10)
      } else {
        factoFunction(shipSize, boat, firstPos, 1)
        sideHorizontal(shipSize, boat, firstPos, 1)
      } 
      //the first positions of the long array are the real position of the boat
      let realBoat = boat.slice(0,shipSize);
      return {boatAndSide:boat.sort((first,last) => first-last), realBoat:realBoat}
  }
    
  const fullPos = (shipSize:number) => {
      //generate alea
      const generateRandom = random10(shipSize)
      const startPos = generateRandom.firstPos
      const orient = generateRandom.orientation  

      // generate and return new boat with alea
      const boat = firstBoatSquare(startPos)
      return lastBoatsquare(startPos, orient, shipSize, boat);
    }
    
    return {
      random10,
      firstBoatSquare,
      lastBoatsquare,
      fullPos,
    }
  }