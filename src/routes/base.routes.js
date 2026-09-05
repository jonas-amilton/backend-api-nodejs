export async function baseRoutes(app) {
  app.get('/', () => {
    return 'Index page'
  })

  app.get('/health', () => {
    return { status: 'ok' }
  })
}
