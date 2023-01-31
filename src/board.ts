export const board = () => {

    const gameBoardPlayer = document.querySelector('.gameBoardPlayer') as HTMLElement
    const gameBoardIA = document.querySelector('.gameBoardIA') as HTMLElement

    const generateBoard = (container:HTMLElement) => {
        for(let i=0;i<100;i++){
        let square = document.createElement('div');
        container.appendChild(square)
        square.classList.add('square')
        square.style.width = `calc(100%/${container})`
        }
    }

    generateBoard(gameBoardPlayer)
    generateBoard(gameBoardIA)
}