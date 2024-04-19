import fs from 'fs'
import _ from 'lodash'

function drawSquareToFile() {
    const str = getSquare(getRandomIntInclusive(3, 20))
    drawToFile(str)
        .then(() => { setTimeout(drawSquareToFile, 200) })
}
function getSquare(size) {
    var str = '*'.repeat(size) + '\n'
    for (let i = 0; i < size; i++) {
        str += '*' + ' '.repeat(size - 2) + '*\n'
    }
    str += '*'.repeat(size) + '\n'
    return str
}

function drawToFile(string){
    return fs.promises.writeFile('data/pic.txt',string,null)
}

drawSquareToFile()

function getRandomIntInclusive(min,max){
    return _.random(min,max)
}