import { boatPosition, ship } from "./boatCreation";

export const DOMInteractions = () => {

    function animationCreateBoat (whatBoard:string, allBoat:any, classCSS:string) {
        for(let i=0;i<allBoat.length;i++){
            for(let eachBoat of allBoat[i].boat){
                const squareOfBoat = document.querySelector(`${whatBoard}div:nth-child(${eachBoat})`) as HTMLElement;
                squareOfBoat.classList.add(classCSS)
            }
        } 
    }
    
    function createBoats () {
        let allPosition:number[] = []
        let allBoat:any = []
        
        loop1:for(let i=5;i>=2;i--){ //create 4 boats, start with the biggest boat (use less memory for the comparaison)
            // create new boat with i size & push his data in allBoat
            let newBoat = boatPosition().fullPos(i)
            allBoat.push(ship(i, newBoat.realBoat)) 

            for(let eachPos of newBoat.boatAndSide){ //for each position of the new boat (with position around the boat)               
                for(let currentPos of allPosition){ //for each position of others boats
                    if(currentPos === eachPos) { //if equals
                        //true : come back to recreate a new boat instead of the current boat, delete current boat
                        i++
                        allBoat.splice([-i+6],1)
                        continue loop1 //come back at start
                    }
                }
            } 
            //add the position of the new boat in allPosition to compare with next one
            for(let eachPos of newBoat.boatAndSide){ 
                allPosition.push(eachPos)
            }  
        }
        return allBoat
    }

    return {createBoats, animationCreateBoat}
}
