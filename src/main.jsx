import React from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardEmpleados } from './components/empleados/DashboardEmpleados'
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <div className="App">
            <DashboardEmpleados />
        </div>
    </>
)
