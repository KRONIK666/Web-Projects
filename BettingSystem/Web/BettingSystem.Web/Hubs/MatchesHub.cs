﻿namespace BettingSystem.Web.Hubs
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNet.SignalR;

    using BettingSystem.Data;
    using BettingSystem.Data.Models;

    public class MatchesHub : Hub
    {
        private static List<Match> Matches = new List<Match>();
        private static BettingSystemDbContext db = new BettingSystemDbContext();

        public void UpdateMatches(string id)
        {
            var matches = AddMatch(id);
            Clients.All.updateMatches(id, matches);
        }

        private static Match AddMatch(string id)
        {
            var match = Matches.Find(s => s.Id == id);

            if (match != null)
            {
                return match;
            }
            else
            {
                var item = db.Matches.Find(id);
                Matches.Add(item);
                return item;
            }
        }

        public override Task OnConnected()
        {
            Clients.All.showUpdatedMatches(Matches.ToList());
            return base.OnConnected();
        }
    }
}