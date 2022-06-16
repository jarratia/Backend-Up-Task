import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())

dotenv.config()

// Conectar la base de datos
connectDB()

// Configurar cors
const whiteList = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            // Puede consultar la api con los permisos adecuados
            callback(null, true)
        } else {
            // No está permitido
            callback(new Error("Error de cors"))
        }
    }
}

app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Servidor en el puerto ${PORT}`))