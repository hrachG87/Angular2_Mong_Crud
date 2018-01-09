using Angular2_Mongo_Crud.BLL.DBEntities;
using Angular2_Mongo_Crud.BLL.Managers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular2_Mongo_Crud.Controllers
{
    [Route("api/customer")]
    public class CustomerController : Controller
    {
        [Route("load")]
        [HttpGet]
        public List<CustomerEntity> LoadCustomers()
        {
            var manager = new CustomerManager();

            var response = manager.LoadCustomers();

            return response;
        }

        [HttpPost]
        [Route("addupdate")]
        public bool CreateUpdateCustomer([FromBody]CustomerEntity customerEntity)
        {
            var manager = new CustomerManager();

            var response = manager.CreateUpdateCustomer(customerEntity);
            return response;
        }

        [HttpPost]
        [Route("delete")]
        public bool DeleteCustomer(string id)
        {
            var manager = new CustomerManager();

            var response = manager.DeleteCustomer(id);
            return response;
        }
    }
}
