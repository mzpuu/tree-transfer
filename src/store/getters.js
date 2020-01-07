const getters = {
  sidebar: state => state.app.sidebar,
  browser: state => state.app.browser,
  token: state => state.user.token,
  name: state => state.user.name,
  role: state => state.user.role,
  roles: state => state.user.roles,
  isAdmin: state => state.user.isAdmin,
  visitedViews: state => state.tagsView.visitedViews,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
