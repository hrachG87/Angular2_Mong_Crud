import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { CustomerManagerComponent } from './components/customermanager/customermanager.component';
import { CustomerService } from './components/customermanager/customermanager.service';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';


@NgModule({
    declarations: [
        AppComponent,
        CustomerManagerComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        SimpleNotificationsModule
    ],
    providers: [CustomerService, NotificationsService]
})
export class AppModuleShared {
}

