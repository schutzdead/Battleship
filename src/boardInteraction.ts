import { gameBoard, ship } from "./factoryFunction";0

export const DOMInteractions = () => {

    function animationCreateBoat (whatBoard:string, allBoat:any, classCSS:string) {
        for(let i=0;i<allBoat.length;i++){
            for(let eachBoat of allBoat[i].boat){ //withdraw first & last pos
                const test = document.querySelector(`${whatBoard}div:nth-child(${eachBoat})`) as HTMLElement;
                test.classList.add(classCSS)
            }
        } 
    }
    
    function createBoats () {
        let allPosition:number[] = []
        let allBoat:any = []

        loop1:for(let i=5;i>=2;i--){ //create 4 boats
            let newBoat = gameBoard().fullPos(i)
            allBoat.push(ship(i, newBoat.realBoat)) //create new boat & push him in allBoat

            for(let eachPos of newBoat.boatAndSide){ //for each position of the new boat                
                for(let currentPos of allPosition){ //for each position saved in allPosition
                    if(currentPos === eachPos) { //check if they are equals
                        //true : come back to recreate a new boat instead of the current boat, delete current boat
                        i++
                        allBoat.splice([-i+6],1)
                        continue loop1 //come back at start
                    }
                }
            } 

            for(let eachPos of newBoat.boatAndSide){ //add the position of the new boat in allPosition
                allPosition.push(eachPos)
            }  
        }
        return allBoat
    }

    //factory function output
    return {createBoats, animationCreateBoat}
}
