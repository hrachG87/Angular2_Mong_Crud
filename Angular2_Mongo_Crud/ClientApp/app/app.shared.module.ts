import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { CustomerManagerComponent } from './components/customermanager/customermanager.component';
import { CustomerService } from './components/customermanager/customermanager.service';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({
    declarations: [
        AppComponent,
        CustomerManagerComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        SimpleNotificationsModule,
        GridModule,
        DialogModule,
        ButtonsModule
    ],
    providers: [CustomerService, NotificationsService]
})
export class AppModuleShared {
}

