namespace BettingSystem.Data.Models
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    public class Bet
    {
        [XmlAttribute("ID")]
        public string Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("IsLive")]
        public bool IsLive { get; set; }

        [XmlElement("Odd")]
        public virtual List<Odd> Odds { get; set; }
    }
}