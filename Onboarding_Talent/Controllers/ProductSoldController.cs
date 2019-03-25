using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding_Talent.Models;

namespace Onboarding_Talent.Controllers
{
    public class ProductSoldController : Controller
    {
        OnboardingEntitiesContext db = new OnboardingEntitiesContext();

        // GET: ProductSold
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LoadAllSales()
        {

            var saleList = from p in db.ProductSolds
                           join c in db.Customers on p.CustomerId equals c.Id
                           join s in db.Stores on p.StoreId equals s.Id
                           join pr in db.Products on p.ProductId equals pr.Id
                           select new
                           {
                               Id = p.Id,
                               CustomerId = p.CustomerId,
                               CustomerName = c.Name,
                               ProductId = p.ProductId,
                               ProductName = pr.Name,
                               StoreId = p.StoreId,
                               StoreName = s.Name,
                               DateSold = p.DateSold

                           };

            
            return Json(saleList, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Create(ProductSold model)
        {
            if (model.Id == 0)
            {
                var newproduct = new ProductSold
                {
                    CustomerId = model.CustomerId,
                    ProductId = model.ProductId,
                    StoreId = model.StoreId,
                    DateSold = model.DateSold 
                };
                try
                {
                    db.ProductSolds.Add(newproduct);
                    db.SaveChanges();
                }
                catch (Exception ex)
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


        public ActionResult Edit(ProductSold model)
        {
            if (ModelState.IsValid)
            {
                var productSold = db.ProductSolds.FirstOrDefault(x => x.Id == model.Id);
                try
                {
                    productSold.CustomerId = model.CustomerId;
                    productSold.ProductId = model.ProductId;
                    productSold.StoreId = model.StoreId;
                    productSold.DateSold = model.DateSold;
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

        public ActionResult Delete(ProductSold model)
        {
            if (ModelState.IsValid)
            {

                var productsold = db.ProductSolds.FirstOrDefault(x => x.Id == model.Id);
                db.ProductSolds.Remove(productsold);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { success = false });
            }
        }
    }
}