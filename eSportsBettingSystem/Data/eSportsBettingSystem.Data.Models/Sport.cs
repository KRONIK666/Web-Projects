namespace eSportsBettingSystem.Data.Models
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    public class Sport
    {
        [XmlAttribute("ID")]
        public string Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlElement("Event")]
        public virtual List<Event> Events { get; set; }
    }
}