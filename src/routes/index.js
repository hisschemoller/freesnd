// The top-level (parent) route
const routes = {
    path: '',
  
    // Keep in mind, routes are evaluated in order
    children: [
        {
            path: '(.*)',
            load: () => import(/* webpackChunkName: 'browse' */ './browse'),
        }
    ],

    async action({ next, store, pathname }) {

        // Execute each child route until one of them return the result
        const route = await next();

        // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'} - FreeSND`;
        route.description = route.description || '';

        return route;
    }
};

export default routes;
