import { Routes } from '@angular/router';
import { Authorization } from '../injectable/authorization.injectable';

export const routes: Routes = [
    {
        path: '',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/todo/todo.component').then((item) => item.TodoComponent),
    },
    {
        path: 'Login',
        loadComponent: () => import('../pages/login/login.component').then((item) => item.LoginComponent),
    },
    {
        path: 'Todo',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/todo/todo.component').then((item) => item.TodoComponent),
    },
    {
        path: 'TodoMore',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/todo-more/todo-more.component').then((item) => item.TodoMoreComponent),
    },
    {
        path: 'InvoiceApplicationForm',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/invoice-application-form/invoice-application-form.component').then((item) => item.InvoiceApplicationFormComponent),
    },
    {
        path: 'InvoiceVoidingForm',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/invoice-voiding-form/invoice-voiding-form.component').then((item) => item.InvoiceVoidingFormComponent),
    },
    {
        path: 'Query',
        canActivate: [Authorization],
        loadComponent: () => import('../pages/query/query.component').then((item) => item.QueryComponent),
    },
    {
        path: 'SwitchUser',
        loadComponent: () => import('../pages/switch-user/switch-user.component').then((item) => item.SwitchUserComponent),
    }
];
