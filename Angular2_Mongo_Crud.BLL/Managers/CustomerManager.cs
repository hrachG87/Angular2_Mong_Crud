using Angular2_Mongo_Crud.BLL.DBEntities;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Angular2_Mongo_Crud.BLL.Managers
{
    public class CustomerManager
    {
        const string MongoDBConnectionString = "mongodb://192.168.1.140:27017";

        private MongoClient MongoDbClient { get; set; }
        private IMongoDatabase CustomerDb { get; set; }

        public CustomerManager()
        {
            this.MongoDbClient = new MongoClient(MongoDBConnectionString);
            this.CustomerDb = this.MongoDbClient.GetDatabase("crud-customers");
        }

        /// <summary>
        /// Loads the list of customers
        /// </summary>
        /// <returns></returns>
        public List<CustomerEntity> LoadCustomers()
        {
            var clnCustomers = CustomerDb.GetCollection<CustomerDbEntity>("customers");
            var lstCustomers = clnCustomers.Find(_ => true).ToList();

            var response = lstCustomers.Select(c => new CustomerEntity()
            {
                Id = c.Id.ToString(),
                Birthdate = c.Birthdate,
                Email = c.Email,
                Name = c.Name,
                Phone = c.Phone
            }).ToList();


            return response;
        }

        /// <summary>
        /// Creates a new customer or updates an existing one
        /// </summary>
        /// <param name="customerEntity"></param>
        /// <returns></returns>
        public bool CreateUpdateCustomer(CustomerEntity customerEntity)
        {
            try
            {
                var clnCustomers = CustomerDb.GetCollection<CustomerDbEntity>("customers");

                if (String.IsNullOrWhiteSpace(customerEntity.Id))
                {
                    var customerDb = new CustomerDbEntity()
                    {
                        Id = ObjectId.GenerateNewId(),
                        Birthdate = customerEntity.Birthdate,
                        Email = customerEntity.Email,
                        Name = customerEntity.Name,
                        Phone = customerEntity.Phone,
                        CreateDate = DateTime.Now,
                        UpdateDate = DateTime.Now
                    };

                    clnCustomers.InsertOne(customerDb);
                }
                else
                {
                    var objectId = ObjectId.Parse(customerEntity.Id);
                    var filter = Builders<CustomerDbEntity>.Filter.Where(c => c.Id == objectId);
                    var update = Builders<CustomerDbEntity>.Update.Set(c => c.Name, customerEntity.Name)
                                                                  .Set(c => c.Email, customerEntity.Email)
                                                                  .Set(c => c.Birthdate, customerEntity.Birthdate)
                                                                  .Set(c => c.Phone, customerEntity.Phone)
                                                                  .Set(c => c.UpdateDate, DateTime.Now);

                    clnCustomers.UpdateOne(filter, update);
                }

                return true;
            }
            catch (Exception ex)
            {
                //Put some logging here
            }

            return false;
        }

        /// <summary>
        /// Deletes Customer by customer id
        /// </summary>
        /// <returns></returns>
        public bool DeleteCustomer(string id)
        {
            try
            {
                var clnCustomers = CustomerDb.GetCollection<CustomerDbEntity>("customers");

                var objectId = ObjectId.Parse(id);
                var filter = Builders<CustomerDbEntity>.Filter.Where(c => c.Id == objectId);

                clnCustomers.DeleteOne(filter);

                return true;
            }
            catch (Exception ex)
            {
                //Put some logging here
            }

            return false;
        }
    }
}
