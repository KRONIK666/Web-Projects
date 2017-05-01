# Web-Projects
Web Pages, Sites &amp; Projects (HTML, CSS &amp; JavaScript)

Project: eSportsBettingSystem

Design the architecture and develop the functionallity of a simple xml-feed consuming web application.

1. Technologies used:
- ASP.NET MVC 5
- Entity Framework Code First
- Microsoft SQL Database
- Signal-R

2. Purpose:
- Collect odds from the vitalbet.net XML feed and display them on a webpage.

3. Task Details:
- After the initial request only the new entities is stored in the database and the existing ones are updated if a change is present.
- Web application will show all available matches which have odds and will start in the next 24 hours.
- Data on the page is updated once every 60 seconds.
- Only new matches are added.
- Matches that do not start in the next 24 hours are removed.
