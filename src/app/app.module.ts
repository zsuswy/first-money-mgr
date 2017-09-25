import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

// Import containers
import {FullLayout} from './containers/full-layout/full-layout.component';
import {SimpleLayout} from './containers/simple-layout/simple-layout.component';
// Import components
import {AppAside} from './components/app-aside/app-aside.component';
import {AppBreadcrumbs} from './components/app-breadcrumbs/app-breadcrumbs.component';
import {AppFooter} from './components/app-footer/app-footer.component';
import {AppHeader} from './components/app-header/app-header.component';
import {AppSidebar} from './components/app-sidebar/app-sidebar.component';
import {AppSidebarFooter} from './components/app-sidebar-footer/app-sidebar-footer.component';
import {AppSidebarHeader} from './components/app-sidebar-header/app-sidebar-header.component';
import {AppSidebarForm} from './components/app-sidebar-form/app-sidebar-form.component';

// Import routing module
import {AppRoutingModule} from './app.routing';
// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';

import {
    SidebarToggleDirective,
    SidebarMinimizeDirective,
    SidebarOffCanvasCloseDirective,
    MobileSidebarToggleDirective
} from './directives/sidebar/sidebar.directive';
import {NavDropdownDirective, NavDropdownToggleDirective} from './directives/nav-dropdown/nav-dropdown.directive';
import {AsideToggleDirective} from './directives/aside/aside.directive';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        FullLayout,
        SimpleLayout,
        AppAside,
        AppBreadcrumbs,
        AppFooter,
        AppHeader,
        AppSidebar,
        AppSidebarFooter,
        AppSidebarForm,
        AppSidebarHeader,
        AsideToggleDirective,
        NavDropdownDirective,
        NavDropdownToggleDirective,
        SidebarToggleDirective,
        SidebarMinimizeDirective,
        SidebarOffCanvasCloseDirective,
        MobileSidebarToggleDirective
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
