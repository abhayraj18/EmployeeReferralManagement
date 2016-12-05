import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    constructor(private _router: Router) {
    }

    ngOnInit() {
        this._router.navigate(['login']);
    }
}