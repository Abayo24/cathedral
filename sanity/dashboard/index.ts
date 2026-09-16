import { DashboardIcon } from '@sanity/icons'
import { definePlugin } from 'sanity'

import { Dashboard } from './Dashboard'

export const dashboardTool = definePlugin({
  name: 'cathedral-dashboard',
  tools: [{ name: 'dashboard', title: 'Dashboard', icon: DashboardIcon, component: Dashboard }],
})
