namespace eSportsBettingSystem.Web.Controllers
{
    using System;
    using System.Data.Entity;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Web.Mvc;
    using System.Xml.Serialization;

    using eSportsBettingSystem.Data;
    using eSportsBettingSystem.Data.Models;

    public class HomeController : Controller
    {
        private eSportsBettingSystemDbContext db = new eSportsBettingSystemDbContext();

        public ActionResult Index()
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(XmlSports));
            var xmlFilePath = "http://vitalbet.net/sportxml";

            byte[] xmlStream;

            using (var wc = new WebClient())
            {
                xmlStream = wc.DownloadData(xmlFilePath);
            }

            var xmlDoc = new MemoryStream(xmlStream);
            var list = (XmlSports)xmlSerializer.Deserialize(xmlDoc);

            foreach (var item in list.Sports)
            {
                var sport = db.Sports.FirstOrDefault(s => s.Id == item.Id);

                if (sport == null)
                {
                    db.Sports.Add(item);
                }
            }

            db.SaveChanges();

            var passedEvents = DateTime.Now.AddHours(-3);
            var finishedMatches = db.Matches.Include(m => m.Bets).Where(m => m.StartDate <= passedEvents);

            foreach (var item in finishedMatches)
            {
                db.Matches.Remove(item);
            }

            db.SaveChanges();

            var startDate = DateTime.Now.AddHours(-2);
            var endDate = DateTime.Now.AddHours(24);
            var matches = db.Matches.Include(m => m.Bets).Where(m => m.StartDate >= startDate && m.StartDate <= endDate).OrderBy(m => m.StartDate);

            return View(matches.ToList());
        }
    }
}