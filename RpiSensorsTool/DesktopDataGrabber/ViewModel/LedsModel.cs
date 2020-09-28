#define CLIENT
#define GET
#define DYNAMIC

using System;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Timers;
using System.Net.Http;
using OxyPlot;
using OxyPlot.Axes;
using OxyPlot.Series;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DesktopDataGrabber.ViewModel
{
    using Model;
    using System.Collections.Generic;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Text;

    /** 
      * @brief View model for MainWindow.xaml 
      */
    public class LedsModel : INotifyPropertyChanged
    {
        #region Properties
        private string _LedX = "X coordinat(0-7)";
        public string LedX
        {
            get
            {
                return _LedX;
            }
            set
            {
                if (_LedX != value)
                {
                    _LedX = value;
                    OnPropertyChanged("LedX");
                }
            }
        }

        private string _LedY = "Y coordinat(0-7)";
        public string LedY 
        {
            get
            {
                return _LedY;
            }
            set
            {
                if (_LedY != value)
                {
                    _LedY = value;
                    OnPropertyChanged("LedY");
                }
            }
        }

        private string _LedColor = "Set color";
        public string LedColor
        {
            get
            {
                return _LedColor;
            }
            set
            {
                if (_LedColor != value)
                {
                    _LedColor = value;
                    OnPropertyChanged("LedColor");
                }
            }
        }

        public ButtonCommand SetDiodsButton { get; set; }


        #endregion

        /*
         * @brief Setup buttons
         */
        public LedsModel()
        {
            SetDiodsButton = new ButtonCommand(SetDiods);
        }

        /**
         * @brief Przekazanie informacji o zapalanej diodzie
         */
        private void SetDiods()
        {
            string Data = Web.GetPost("http://192.168.8.126/RPi_App_Web_Projeckt/server/led_display.php", "postwiersz", LedX, "postkolumna",  LedY, "postkolor", LedColor);
        }


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
