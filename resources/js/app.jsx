import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './Layout';

createInertiaApp({
  id:"app",
  resolve: name => {
    const pages = import.meta.glob('./Page/**/*.jsx', { eager: true })
    let page=pages[`./Page/${name}.jsx`]
    page.default.layout=page.default.layout || (page => <Layout children={page} />)
    //return pages[`./Page/${name}.jsx`]
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      
        <App {...props}/>
    
    )
  },
})