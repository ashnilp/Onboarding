using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding_Talent.Models;

namespace Onboarding_Talent.Controllers
{
    public class ProductController : Controller
    {
        OnboardingEntitiesContext db = new OnboardingEntitiesContext();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LoadProducts()
        {
            var productList = db.Products.Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
            }).ToList();

            return Json(productList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create(Product model)
        {
            if (model.Id == 0)
            {
                var newproduct = new Product
                {
                    Name = model.Name.Trim(),
                    Price = model.Price
                };
                try
                {
                    db.Products.Add(newproduct);
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

        public ActionResult Delete(Product model)
        {
            if (ModelState.IsValid)
            {

                var product = db.Products.FirstOrDefault(x => x.Id == model.Id);
                db.Products.Remove(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { success = false });
            }
        }

        public ActionResult Edit(Product model)
        {
            if (ModelState.IsValid)
            {
                var product = db.Products.FirstOrDefault(x => x.Id == model.Id);
                try
                {
                    product.Name = model.Name.Trim();
                    product.Price = model.Price;
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