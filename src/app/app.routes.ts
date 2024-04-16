import { Routes } from '@angular/router';
import { AuthGuard } from './admin-layout/auth/services/auth.guard';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin',
    },

    //ADMIN layout
    {
        path: 'admin',
        loadComponent: () => import('./admin-layout/admin-page.component')
            .then(mod => mod.AdminPageComponent),
        canActivate: [AuthGuard],
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

    //SITE layout
    // {
    //     path: '',
    //     loadComponent: () => import('./site-layout/home.component')
    //         .then(mod => mod.HomeComponent),
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: 'plans',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: 'plans',
    //             loadComponent: () => import('./site-layout/plan-list/containers/menu-list-container/plan-list-container.component')
    //                 .then(mod => mod.PlanListContainerComponent),
    //         },
    //     ]
    // },

    {
        path: 'login',
        loadComponent: () => import('./admin-layout/auth/components/login/containers/login-container/login-container.component')
            .then(mod => mod.AdminLoginContainer),
    },
    // {
    //     path: 'reset-password',
    //     loadComponent: () => import('./admin-layout/auth/components/resetPassword/containers/resetPassword-container/resetPassword-container.component')
    //         .then(mod => mod.AdminResetPasswordContainer),
    // },


     {
        path: 'registration',
        loadComponent: () => import('./admin-layout/auth/components/registration/registration.component')
            .then(mod => mod.RegistrationComponent),
    },
    //default route
    {
        path: '**',
        redirectTo: 'admin'
    }
];
