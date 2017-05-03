namespace BettingSystem.Data
{
    using System.Data.Entity;

    using BettingSystem.Data.Models;

    public class BettingSystemDbContext : DbContext
    {
        public BettingSystemDbContext()
            : base("BettingSystemDb")
        {
        }

        public virtual IDbSet<Sport> Sports { get; set; }

        public virtual IDbSet<Event> Events { get; set; }

        public virtual IDbSet<Match> Matches { get; set; }

        public virtual IDbSet<Bet> Bets { get; set; }

        public virtual IDbSet<Odd> Odds { get; set; }

        public static BettingSystemDbContext Create()
        {
            return new BettingSystemDbContext();
        }
    }
}