import { Component } from '@angular/core';
import { CustomerService } from './customermanager.service';
import { Http, Response } from '@angular/http';
import { CustomerEntity } from './customer.models';
import { NotificationsService } from 'angular2-notifications';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'customer-manager',
    templateUrl: './customermanager.component',
    styleUrls: ['./customermanager.component.less']
})
export class CustomerManagerComponent {

    private IsLoading: boolean = false;
    private CustomerList: Array<CustomerEntity> = [];
    private Customer: CustomerEntity = null;


    public NotificationOptions: any = {
        position: ['top', 'right'],
        timeOut: 3000
    };

    public constructor(private customerService: CustomerService,
        private notificationService: NotificationsService
    ) {

    }

    public LoadCustomers() {

        this.IsLoading = true;
        this.CustomerList = [];

        this.customerService.LoadCustomers().then((response: Response) => {
            var responseData = <Array<CustomerEntity>>response.json();
            this.IsLoading = false;

            if (responseData != null) {
                this.CustomerList = responseData;
            }
            else {
                this.notificationService.error("Error occured while loading customer data");
            }
        }).catch(error => {
            this.IsLoading = false;
            this.notificationService.error("Error occured while loading customer data");
        });
    }

    public AddUpdateCustomer(form: NgForm) {

        for (var key in form.controls) {
            if (form.controls[key].markAsDirty) {
                form.controls[key].markAsDirty();
            }
        }

        if (form.valid) {
            this.IsLoading = true;
            this.customerService.AddUpdateCustomer(this.Customer).then((response: Response) => {
                this.IsLoading = false;
                var isSuccess = <boolean>response.json();

                if (isSuccess) {
                    this.notificationService.success("Customer has been successfully saved!");
                    this.LoadCustomers();
                    this.Customer = null;

                }
                else {
                    this.notificationService.error("Error occured while saving customer. Please try again...");
                }
            }).catch(error => {
                this.IsLoading = false;
                this.notificationService.error("Error occured while saving customer. Please try again...");
            });
        }
    }

    public DeleteCustomer(customerId: string) {

        if (confirm("Are you sure you want to delete customer?")) {
            this.IsLoading = true;

            this.customerService.DeleteCustomer(customerId).then((response: Response) => {
                this.IsLoading = false;
                var isSuccess = <boolean>response.json();

                if (isSuccess) {
                    this.notificationService.success("Customer has been successfully deleted");
                    this.LoadCustomers();
                }
                else {
                    this.notificationService.error("Error occured while deleted customer. Please try again...");
                }
            }).catch(error => {
                this.IsLoading = false;
                this.notificationService.error("Error occured while deleted customer. Please try again...");
            });
        }
    }

}
