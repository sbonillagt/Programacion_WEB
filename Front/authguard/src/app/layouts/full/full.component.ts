
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    ViewChild,
    HostListener,
    Directive
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

/** @title Responsive sidenav */
@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: []
})
export class FullComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    dir = 'ltr';
    green: boolean= false;
    blue: boolean = false;
    dark: boolean = false;
    minisidebar : boolean= false;
    boxed: boolean = false;
    danger: boolean= false;
    showHide: boolean= false;
    url: string = '';
    sidebarOpened: boolean = false;

    public showSearch = false;

    public config: PerfectScrollbarConfigInterface = {};
    private _mobileQueryListener: () => void;

    constructor(
        public router: Router,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public menuItems: MenuItems
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    // Mini sidebar
}
