import { Request, Response } from 'express'

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

const getAllDrivers = async (req: Request, res: Response) => {
    res.status(200).send(global.drivers)
}

export const driverOverTake = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.driverId)
    const driverData = Object.values(global.drivers).filter(item => item.id === driverId)

    // check selected driver current place

    if(driverData.length && driverData[0].place > 1) {
        const overTakeDriver = Object.values(global.drivers).filter(item => {
            if(item.place === driverData[0].place - 1) {
                return item
            }
        })
    
        for(const driver of global.drivers) {
            if(driver.id === driverData[0].id) {
                driver.place -= 1
            }
            if(driver.id === overTakeDriver[0].id) {
                driver.place += 1
            }
        }
    }

    res.status(200).send(global.drivers)
}

export default getAllDrivers
