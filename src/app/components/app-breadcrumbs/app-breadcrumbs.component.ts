import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './app-breadcrumbs.component.html'
})
export class AppBreadcrumbs {
    breadcrumbs: Array<Object>;

    constructor(private router: Router,
                private route: ActivatedRoute) {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
            this.breadcrumbs = [];
            let currentRoute = this.route.root,
                url = '';
            do {
                const childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(_route => {
                    if (_route.outlet === 'primary') {
                        const routeSnapshot = _route.snapshot;
                        url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                        this.breadcrumbs.push({
                            label: _route.snapshot.data,
                            url: url
                        });
                        currentRoute = _route;
                    }
                });
            } while (currentRoute);
        });
    }
}
