using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding_Talent.Models;

namespace Onboarding_Talent.Controllers
{
    public class HomeController : Controller
    {
        OnboardingEntitiesContext db = new OnboardingEntitiesContext();

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

       

        public JsonResult LoadCustomers()
        {
            var customerList = db.Customers.Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();

            return Json(customerList, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult Create (Customer model)
        {
            if (model.Id == 0)
            {
                var newcustomer = new Customer
                {
                    Name = model.Name.Trim(),
                    Address = model.Address.Trim()
                };
                try
                {
                    db.Customers.Add(newcustomer);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return Json(new { success = false });
                }

                return RedirectToAction("Index");
            }else
            {
                return Json(new { success = false });
            }
        }

        public ActionResult Delete (Customer model)
        {
            if (ModelState.IsValid)
            {

                var customer = db.Customers.FirstOrDefault(x => x.Id == model.Id);
                db.Customers.Remove(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { success = false });
            }
        }

        public ActionResult Edit(Customer model)
        {
            if (ModelState.IsValid)
            {
                var customer = db.Customers.FirstOrDefault(x => x.Id == model.Id);
                try
                {
                    customer.Name = model.Name.Trim();
                    customer.Address = model.Address.Trim();
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Json(new { success = false });
                }
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { success = false });
            }
        }
    }
}