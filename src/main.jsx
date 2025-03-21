import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Provider} from "react-redux"
import store from './store/store.jsx'

import App from './App.jsx'
import LeadManagement from './pages/LeadManagement.jsx'
import SaleAgentManagement from './pages/SalesAgentManagement.jsx'
import Report from './pages/Reports.jsx'
import LeadList from './pages/LeadList.jsx'
import LeadStatus from './pages/LeadStatus.jsx'
import SalesAgent from './pages/SalesAgent.jsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:'/leadManagement/:id',
    element:<LeadManagement/>
  },
  {
    path:'/saleAgentManagement',
    element:<SaleAgentManagement/>
  },
  {
    path:'/reports',
    element:<Report />
  },
  {
    path:"/leadList",
    element:<LeadList/>
  },
  {
    path:"/leadStatus",
    element:<LeadStatus/>
  },
  {
    path:"/salesAgent/:id",
    element:<SalesAgent/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)
