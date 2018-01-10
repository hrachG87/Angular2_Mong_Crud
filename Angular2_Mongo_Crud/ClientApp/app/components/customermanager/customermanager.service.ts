import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Urls } from './../constants';
import { CustomerEntity } from './customer.models';
//import {  } from 'rxjs';

@Injectable()
export class CustomerService {

    public errorHandler: any = error => console.error('CustomerService error', error);

    public constructor(private $http: Http) {

    }

    public LoadCustomers(): Promise<Response> {
        return this.$http.get(Urls.loadCustomers).toPromise().catch(this.errorHandler);
    }

    public AddUpdateCustomer(customerEntity: CustomerEntity): Promise<Response> {
        return this.$http.post(Urls.addUpdateCustomer, customerEntity).toPromise();
    }

    public DeleteCustomer(id: string): Promise<Response> {
        return this.$http.delete(Urls.deleteCustomer + "?id=" + id).toPromise();
    }
}
