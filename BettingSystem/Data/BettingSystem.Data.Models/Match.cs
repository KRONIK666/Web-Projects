namespace BettingSystem.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Xml.Serialization;

    public class Match
    {
        [XmlAttribute("ID")]
        public string Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("StartDate")]
        public DateTime StartDate { get; set; }

        [XmlAttribute("MatchType")]
        public string MatchType { get; set; }

        [XmlElement("Bet")]
        public virtual List<Bet> Bets { get; set; }
    }
}