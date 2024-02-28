import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin',
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin-layout/admin-page.component')
            .then(mod => mod.AdminPageComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./admin-layout/dashboard/containers/dashboard-list-container/dashboard-list-container.component')
                    .then(mod => mod.AdminDashboardContainerComponent),
                // canActivate: [AuthGuard]
            },
            {
                path: 'contacts',
                loadComponent: () => import('./admin-layout/contacts/component/contacs/contacts.component')
                    .then(mod => mod.ContactsComponent),
                // canActivate: [AuthGuard]
            },
            //   {
            //     path: 'auth',
            //     loadComponent: () => import('./admin-layout/dashboard/containers/dashboard-list-container/dashboard-list-container.component')
            //       .then(mod => mod.AdminDashboardContainerComponent),
            //     canActivate: [AuthGuard]
            //   },
           
        ]
    },

    {
        path: 'login',
        loadComponent: () => import('./admin-layout/auth/components/login/containers/login-container/login-container.component')
            .then(mod => mod.AdminLoginContainer),
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./admin-layout/auth/components/resetPassword/containers/resetPassword-container/resetPassword-container.component')
            .then(mod => mod.AdminResetPasswordContainer),
    },

    //default route
    {
        path: '**',
        redirectTo: 'admin'
    }
];
