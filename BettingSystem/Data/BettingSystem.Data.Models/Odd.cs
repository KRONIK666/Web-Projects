namespace BettingSystem.Data.Models
{
    using System.Xml.Serialization;

    public class Odd
    {
        [XmlAttribute("ID")]
        public string Id { get; set; }

        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("Value")]
        public double Value { get; set; }

        [XmlAttribute("SpecialBetValue")]
        public string SpecialBetValue { get; set; }
    }
}