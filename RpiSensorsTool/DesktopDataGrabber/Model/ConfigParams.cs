using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace DesktopDataGrabber.Model
{
    public class ConfigParams
    {
        static readonly string ipAddressDefault = "192.168.8.126";
        public string IpAddress;
        static readonly int sampleTimeDefault = 500;
        public int SampleTime;
        public readonly int MaxSampleNumber = 100;
        public double XAxisMax
        {
            get
            {
                return MaxSampleNumber * SampleTime / 1000.0;
            }
            private set { }
        }


        /**
         * @brief Zapisuje dane konfiguracyjne do pliku
         * @param ip to adres IP, st to czas próbkowania
         */
        public ConfigParams(string ip, int st)
        {
            IpAddress = ip;
            SampleTime = st;

            JObject configJson = new JObject(
            new JProperty("IpAddres", IpAddress),
            new JProperty("SampleTime", SampleTime)
            );

            File.WriteAllText(@"config.json", configJson.ToString());
        }

        /**
         * @brief Pobiega dane konfiguracyjne z pliku
         */
        public ConfigParams() 
        {

            using (StreamReader file = File.OpenText(@"config.json"))
            using (JsonTextReader reader = new JsonTextReader(file))
            {
                JObject o2 = (JObject)JToken.ReadFrom(reader);
                IpAddress = o2.GetValue("IpAddres").Value<string>();
                SampleTime = o2.GetValue("SampleTime").Value<int>();
            }
        }
    }
}
