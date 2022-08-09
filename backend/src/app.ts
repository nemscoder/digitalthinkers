import express, {Request, Response, NextFunction} from "express"
import compression from 'compression'
import cors from 'cors'
import DriverRoutes from './routes/drivers.route'
import loadDriversData from "./controllers/init.controller"
import path from "path"

loadDriversData()
const PORT = process.env.PORT || 5000
const app = express()

app.use(function (req: Request, res: Response, next: NextFunction) {
  const allowedOrigins = ['http://localhost:3000']
  
  if (allowedOrigins.includes('http://localhost:3000')) {
       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  }

  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
  } else {
      return next()
  }
})
/*
const corstOpts = cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
})
*/
/*
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('req:', req)
  return next()
})
*/

DriverRoutes(app)
app.use('/static', express.static(path.join(__dirname, '/datasource/static/')))
// app.use('*', corstOpts)
app.use(compression())

app.listen({ port: PORT }, () =>
  console.log(`Server started on port ${PORT}`)
)