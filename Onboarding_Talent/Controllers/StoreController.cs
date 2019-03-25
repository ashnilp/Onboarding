using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding_Talent.Models;

namespace Onboarding_Talent.Controllers
{
    public class StoreController : Controller
    {

        OnboardingEntitiesContext db = new OnboardingEntitiesContext();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LoadStores()
        {
            var storeList = db.Stores.Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();

            return Json(storeList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create(Store model)
        {
            if (model.Id == 0)
            {
                var newstore = new Store
                {
                    Name = model.Name.Trim(),
                    Address = model.Address.Trim()
                };
                try
                {
                    db.Stores.Add(newstore);
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

        public ActionResult Delete(Store model)
        {
            if (ModelState.IsValid)
            {

                var store = db.Stores.FirstOrDefault(x => x.Id == model.Id);
                 db.Stores.Remove(store);
                 db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return Json(new { success = false });
            }
        }

        public ActionResult Edit(Store model)
        {
            if (ModelState.IsValid)
            {
                var store = db.Stores.FirstOrDefault(x => x.Id == model.Id);
                try
                {
                    store.Name = model.Name.Trim();
                    store.Address = model.Address.Trim();
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