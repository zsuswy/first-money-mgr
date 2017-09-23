import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {
    FullLayout,
    SimpleLayout
} from './containers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayout,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'components',
                loadChildren: './modules/components/components.module#ComponentsModule'
            },
            {
                path: 'icons',
                loadChildren: './modules/icons/icons.module#IconsModule'
            },
            {
                path: 'widgets',
                loadChildren: './modules/widgets/widgets.module#WidgetsModule'
            },
            {
                path: 'charts',
                loadChildren: './modules/chartjs/chartjs.module#ChartJSModule'
            },
            {
                path: 'survey',
                loadChildren: './modules/survey/survey.module#SurveyModule'
            }
        ]
    },
    {
        path: 'pages',
        component: SimpleLayout,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: './modules/pages/pages.module#PagesModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
