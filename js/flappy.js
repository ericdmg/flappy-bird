function createNewElement(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barrier(reverse = false){
    this.element = createNewElement('div', 'barrier')
    const mouthpiece = createNewElement('div', 'mouthpiece')
    const pipe = createNewElement('div', 'pipe')

    this.element.appendChild(reverse ? pipe : mouthpiece)
    this.element.appendChild(reverse ? mouthpiece : pipe)

    this.setHeight = height => pipe.style.height = `${height}px`
}

// const b = new Barrier(true)
// b.setHeight(200)
// document.querySelector('[wm-flappy]').appendChild(b.element)