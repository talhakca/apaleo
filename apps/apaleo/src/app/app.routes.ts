import { Route } from '@angular/router';
import { usersDashboardRoutes } from '@apaleo/users-dashboard';

export const appRoutes: Route[] = [
    {
        path:'',
        redirectTo:'users',
        pathMatch:'full'
    },
    {
        path:'users',
        loadChildren: () => usersDashboardRoutes
    }
];
