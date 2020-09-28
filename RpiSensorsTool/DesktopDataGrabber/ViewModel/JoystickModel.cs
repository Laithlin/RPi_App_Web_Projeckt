#define CLIENT
#define GET
#define DYNAMIC

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesktopDataGrabber.ViewModel
{
    using Model;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Text;
    using System.Timers;

    public class JoystickModel : INotifyPropertyChanged
    {
        #region Properties

        private string ipAddress;
        public string IpAddress
        {
            get
            {
                return ipAddress;
            }
            set
            {
                if (ipAddress != value)
                {
                    ipAddress = value;
                    OnPropertyChanged("IpAddress");
                }
            }
        }
        private int sampleTime;
        public string SampleTime
        {
            get
            {
                return sampleTime.ToString();
            }
            set
            {
                if (Int32.TryParse(value, out int st))
                {
                    if (sampleTime != st)
                    {
                        sampleTime = st;
                        OnPropertyChanged("SampleTime");
                    }
                }
            }
        }

        public ButtonCommand StartButton { get; set; }
        public ButtonCommand StopButton { get; set; }
        public ButtonCommand UpdateConfigButton { get; set; }
        public ButtonCommand DefaultConfigButton { get; set; }

        #endregion

        #region Fields
        private int timeStamp = 0;
        private ConfigParams config = new ConfigParams();
        private Timer RequestTimer;
        private IoTServer Server;
        #endregion

        public JoystickModel()
        {
            //StartButton = new ButtonCommand(StartTimer);
            //StopButton = new ButtonCommand(StopTimer);
            //UpdateConfigButton = new ButtonCommand(UpdateConfig);
            //DefaultConfigButton = new ButtonCommand(DefaultConfig);

            //ipAddress = config.IpAddress;
            //sampleTime = config.SampleTime;

            //Server = new IoTServer(IpAddress);
        }





        #region ButtonCommands

        /**
         * @brief RequestTimer start procedure.
         */


        /**
         * @brief RequestTimer stop procedure.
         */
        private void StopTimer()
        {
            if (RequestTimer != null)
            {
                RequestTimer.Enabled = false;
                RequestTimer = null;
            }
        }

        /**
         * @brief Configuration parameters update
         */
        private void UpdateConfig()
        {
            bool restartTimer = (RequestTimer != null);

            if (restartTimer)
                StopTimer();

            config = new ConfigParams(ipAddress, sampleTime);
            Server = new IoTServer(IpAddress);

            //if (restartTimer)
                //StartTimer();
        }

        /**
          * @brief Configuration parameters defualt values
          */
        private void DefaultConfig()
        {
            bool restartTimer = (RequestTimer != null);

            if (restartTimer)
                StopTimer();

            config = new ConfigParams();
            IpAddress = config.IpAddress;
            SampleTime = config.SampleTime.ToString();
            Server = new IoTServer(IpAddress);

        
        }
        #endregion


        #region PropertyChanged

        public event PropertyChangedEventHandler PropertyChanged;

        /**
         * @brief Simple function to trigger event handler
         * @params propertyName Name of ViewModel property as string
         */
        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
        }

        #endregion
    }
}
