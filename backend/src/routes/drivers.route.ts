import getAllDrivers, { driverOverTake } from "../controllers/drivers.controller"

const routesConfig = function (app: any) {
    app.get('/api/drivers', [
        getAllDrivers
    ])
    app.post('/api/drivers/:driverId/overtake', [
        driverOverTake
    ])
}

export default routesConfig
