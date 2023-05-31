using Microsoft.AspNetCore.Mvc;
using PeopleList.Models;
using System.Diagnostics;
using System.Collections.Generic;

namespace PeopleList.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult FillContactsDialouge(string contactFilter)
        {
            var list = new List<KeyValuePair<string, string>>();

            List<Person> people = new List<Person>
            {
                new Person { ContactId = 1, DisplayName = "John Smith" },
                new Person { ContactId = 2, DisplayName = "Jane Doe" },
                new Person { ContactId = 3, DisplayName = "Mike Johnson" },
                new Person { ContactId = 4, DisplayName = "Emily Wilson" },
                new Person { ContactId = 5, DisplayName = "David Brown" },
                new Person { ContactId = 6, DisplayName = "Sarah Davis" },
                new Person { ContactId = 7, DisplayName = "Michael Anderson" },
                new Person { ContactId = 8, DisplayName = "Emma Taylor" },
                new Person { ContactId = 9, DisplayName = "James Wilson" },
                new Person { ContactId = 10, DisplayName = "Olivia Martinez" }
            };


            foreach (Person person in people)
            {
                if (!string.IsNullOrEmpty(contactFilter))
                {
                    if (person.DisplayName.ToLower().StartsWith(contactFilter.ToLower()))
                    {
                        list.Add(new KeyValuePair<string, string>(person.ContactId.ToString(), person.DisplayName));
                    }
                }
                else
                {
                    list.Add(new KeyValuePair<string, string>(person.ContactId.ToString(), person.DisplayName));
                }
            };



            return Json(list);
        }
    

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}