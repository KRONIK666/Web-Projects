namespace BettingSystem.Data.Models
{
    using System.Collections.Generic;
    using System.Xml.Serialization;

    [XmlRoot("XmlSports")]
    public class XmlSports
    {
        [XmlElement("Sport")]
        public virtual List<Sport> Sports { get; set; }
    }
}