import * as fs from 'fs'
import * as path from 'path'

function readFile(fileSrc: string) {
    const fileContents = fs.readFileSync(
      path.join(__dirname, fileSrc),
      {
        encoding: 'utf-8',
      },
    )
  
    return fileContents
}

function* range(start: number, end: number, step:number) {
  while (start < end) {
    yield start;
    start += step;
  }
}

interface Driver {
  id: number,
  code: string,
  firstname: string,
  lastname: string,
  country: string,
  team: string,
  imgUrl: string,
  place: number,
}

export default function loadDriversData () {
    console.log('reading drivers file...')
    const driversSource = readFile('../datasource/drivers.json')
    const drivers = driversSource ? JSON.parse(driversSource) : null
    const placesArray = Array.from(range(1,drivers.length + 1,1)).sort(() => Math.random() - 0.5)

    if(drivers) drivers.map((item : Driver, i: number) => {
      item.imgUrl = `/static/${item.code.toLocaleLowerCase()}.png`
      item.place = placesArray[i]
    })

    globalThis.drivers = drivers
}

declare global {
    // eslint-disable-next-line no-var
    var drivers: Array<Driver>
}
