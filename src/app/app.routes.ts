import { Routes } from '@angular/router';
import { AuthGuard } from '../injectable/auth-guard.injectable';
import { CallbackComponent } from '../components/callback-component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../pages/todo/todo.component').then((item) => item.TodoComponent),
    },

    {
        path: 'AuthGuard',
        canActivate: [AuthGuard],
        loadComponent: () => import('../pages/todo/todo.component').then((item) => item.TodoComponent),
    },
    { 
        path: "Callback", 
        component: CallbackComponent 
    },

    {
        path: 'Login',
        loadComponent: () => import('../pages/login/login.component').then((item) => item.LoginComponent),
    },
    {
        path: 'Todo',
        loadComponent: () => import('../pages/todo/todo.component').then((item) => item.TodoComponent),
    },
    {
        path: 'TodoMore',
        loadComponent: () => import('../pages/todo-more/todo-more.component').then((item) => item.TodoMoreComponent),
    },
    {
        path: 'Form',
        loadComponent: () => import('../pages/form/form.component').then((item) => item.FormComponent),
    },
    {
        path: 'Query',
        loadComponent: () => import('../pages/query/query.component').then((item) => item.QueryComponent),
    },
    {
        path: 'SwitchUser',
        loadComponent: () => import('../pages/switch-user/switch-user.component').then((item) => item.SwitchUserComponent),
    },
    
    {
        path: 'SampleInputCsv',
        loadComponent: () => import('../pages/sample-input-csv/sample-input-csv.component').then((item) => item.SampleInputCsvComponent),
    },
    {
        path: 'SampleDialogConfirm',
        loadComponent: () => import('../pages/sample-dialog-confirm/sample-dialog-confirm.component').then((item) => item.SampleDialogConfirmComponent),
    },
    {
        path: 'SampleLayoutPixelArt',
        loadComponent: () => import('../pages/sample-layout-pixel-art/sample-layout-pixel-art.component').then((item) => item.SampleLayoutPixelArtComponent),
    }
];
