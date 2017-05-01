namespace eSportsBettingSystem.Data
{
    using System.Data.Entity;

    using eSportsBettingSystem.Data.Models;

    public class eSportsBettingSystemDbContext : DbContext
    {
        public eSportsBettingSystemDbContext()
            : base("eSportsBettingSystemDb")
        {
        }

        public virtual IDbSet<Sport> Sports { get; set; }

        public virtual IDbSet<Event> Events { get; set; }

        public virtual IDbSet<Match> Matches { get; set; }

        public virtual IDbSet<Bet> Bets { get; set; }

        public virtual IDbSet<Odd> Odds { get; set; }

        public static eSportsBettingSystemDbContext Create()
        {
            return new eSportsBettingSystemDbContext();
        }
    }
}