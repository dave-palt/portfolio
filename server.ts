import index from './index.html'
import { serve } from 'bun'

serve({
  routes: {
    '/': index,
    '/src/*': async (req) => {
      const path = new URL(req.url).pathname
      const filePath = '.' + path
      const file = Bun.file(filePath)
      return new Response(file)
    },
  },
  development: {
    hmr: true,
    console: true,
  },
})

console.log('🚀 Dev server running at http://localhost:3000')
