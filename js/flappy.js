function createNewElement(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barrier(reverse = false){
    this.element = createNewElement('div', 'barrier')
    let mouthpiece = createNewElement('div', 'mouthpiece')
    const pipe = createNewElement('div', 'pipe')

    this.element.appendChild(reverse ? pipe : mouthpiece)
    this.element.appendChild(reverse ? mouthpiece : pipe)

    this.setHeight = height => pipe.style.height = `${height}px`

}

// const b = new Barrier(true)
// b.setHeight(200)
// document.querySelector('[wm-flappy]').appendChild(b.element)

function PairOfBarriers(height, opening, x){
    this.element = createNewElement('div', 'pair-of-barriers')

    this.superior = new Barrier(true)
    this.inferior = new Barrier(false)

    this.element.appendChild(this.superior.element)
    this.element.appendChild(this.inferior.element)

    this.randomizeOpening = () => {
        const superiorHeight = Math.random() * (height - opening)
        const inferiorHeight = height - opening - superiorHeight
        this.superior.setHeight(superiorHeight)
        this.inferior.setHeight(inferiorHeight)
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = x => this.element.style.left = `${x}px`
    this.getWidth = () => this.element.clientWidth

    this.randomizeOpening()
    this.setX(x)
}

function Barriers(height, width, opening, spaceBetweenBarriers, notifyPoints){
    this.pairs = [
        new PairOfBarriers(height, opening, width),
        new PairOfBarriers(height, opening, width + spaceBetweenBarriers),
        new PairOfBarriers(height, opening, width + spaceBetweenBarriers * 2),
        new PairOfBarriers(height, opening, width + spaceBetweenBarriers * 3)
    ]

    const displacement = 3
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement)
        
            // pair of barriers leaving screen
            if(pair.getX() < - pair.getWidth()){
                pair.setX(pair.getX() + spaceBetweenBarriers * this.pairs.length)
                pair.randomizeOpening()
            }

            const middle = width / 2
            const mouthpiece = document.querySelector('.mouthpiece')
            const mouthPieceWidth = parseInt(getComputedStyle(mouthpiece).width.split('px')[0])
            console.log(mouthPieceWidth)
            
            const middleCrossed = pair.getX() + displacement >= middle - mouthPieceWidth - 30
                && pair.getX() < middle - mouthPieceWidth - 30

            //middleCrossed && notifyPoints()
        })
    }
}

function Bird(gameHeight){
    let flying = false

    this.element = createNewElement('img', 'bird')
    this.element.src = 'imgs/passaro.png'

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom = `${y}px`

    window.onkeydown = e => flying = true
    window.onkeyup = e => flying = false

    this.animate = () => {
        const newY = this.getY() (flying ? 8 : -5)
        const maximumHeight = gameHeight - this.element.clientHeight

        if(this.getY() <= 0){
            this.setY(0)
        }
        else if(this.getY() >= maximumHeight){
            this.setY(maximumHeight)
        }
        else this.setY(newY)
    }
    this.setY(gameHeight / 2)
}

const barreiras = new Barriers(700, 1200, 200, 400)
// const passaro = new Passaro(700)
const areaDoJogo = document.querySelector('[wm-flappy]')

// areaDoJogo.appendChild(new Progresso().elemento)
// areaDoJogo.appendChild(passaro.elemento)
barreiras.pairs.forEach(par => areaDoJogo.appendChild(par.element))
setInterval(() => {
    barreiras.animate()
    //passaro.animar()
}, 20)