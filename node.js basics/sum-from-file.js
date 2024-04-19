import fs from 'fs'

sumFromFile('data/nums.txt')
.then(sum => console.log('Sum:', sum))
.catch(err => console.log('Cannot sum:', err))


function sumFromFile(filePath) {
    return new  Promise((resolve,reject) =>{
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error('error reading file:', err))
                return
            }
            const numbers = data.split('\n')
            const sum = numbers.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue)
              }, 0)
              resolve(sum) 
        })
    })    
}