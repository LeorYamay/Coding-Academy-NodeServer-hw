import fs from 'fs'
import https from 'https'

downloadCountryFlags()
// getCountries()
function downloadCountryFlags() {
    const countries = getCountries().then(countries => {
        console.log(countries.map(c=>c.name.common))
        downloadFlags(countries)
            .then(() => {
                console.log('Your flags are ready')
            })
    })
}

function getCountries() {
    return new Promise((resolve, reject) => {
        fs.readFile('data/newCountries.json', 'utf-8', (err, data) => {
            if (err) {
                reject(new Error('error reading file:', err))
                return
            }
            const countries = JSON.parse(data)
            countries.sort((country1, country2) => country2.population - country1.population)
            const topCountries = countries.slice(0, 5)
            resolve(topCountries)
        })
    })
}
function downloadFlags(countries) {
    const flagPromises = []
    for (const country of countries) {
        const flagPromise = new Promise((resolve, reject) => {
            const destinationPath = 'data\\flags\\' + country.name.common+ '.svg'
            const file = fs.createWriteStream(destinationPath)
            const flagurl = country.flags.svg
            https.get(flagurl, response => {
                response.pipe(file)
                file.on('finish', () => {
                    file.close(() => {
                        resolve()
                    })
                })
            }).on('error', err => {
                fs.unlink(destinationPath, () => {
                    reject(err)
                })
            })
        })
        flagPromises.push(flagPromise)
    }
    return Promise.all(flagPromises)
}