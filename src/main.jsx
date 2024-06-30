import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
   <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
