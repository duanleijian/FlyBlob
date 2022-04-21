import React, {lazy} from 'react'
import { useRoutes } from 'react-router-dom'
import routerMaps from './index'
export default function RouterNavigate() {             
    return useRoutes(routerMaps)
}
