namespace BettingSystem.Data.Models
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    public class Event
    {
        [XmlAttribute("ID")]
        public string Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("IsLive")]
        public bool IsLive { get; set; }

        [XmlElement("Match")]
        public virtual List<Match> Matches { get; set; }
    }
}