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

    /** 
      * @brief View model for Temperature.xaml 
      */
    public class TemperatureModel : INotifyPropertyChanged
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
        public PlotModel TemperaturePlotModel { get; set; }
        public PlotModel HumidityPlotModel { get; set; }
        public PlotModel PressurePlotModel { get; set; }
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

        /**
         * @brief Inizjalizacja wykresów
         */
        public TemperatureModel()
        {
            TemperaturePlotModel = new PlotModel { };
            HumidityPlotModel = new PlotModel { };
            PressurePlotModel = new PlotModel { };

            TemperaturePlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Bottom,
                Minimum = 0,
                Maximum = config.XAxisMax,
                Key = "Horizontal",
            });

            
            TemperaturePlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Left,
                Minimum = -30,
                Maximum = 105,
                Key = "Vertical",
                Unit = "°C",
                Title = "Temperature"
            });


            HumidityPlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Bottom,
                Minimum = 0,
                Maximum = config.XAxisMax,
                Key = "Horizontal",
            });
            HumidityPlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Left,
                Minimum = 0,
                Maximum = 100,
                Key = "Vertical",
                Unit = "%",
                Title = "Humidity"
            });

            PressurePlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Bottom,
                Minimum = 0,
                Maximum = config.XAxisMax,
                Key = "Horizontal",
                Unit = "sec",
                Title = "Time"
            });
            PressurePlotModel.Axes.Add(new LinearAxis()
            {
                Position = AxisPosition.Left,
                Minimum = 260,
                Maximum = 1260,
                Key = "Vertical",
                Unit = "mbar",
                Title = "Pressure"
            });


            TemperaturePlotModel.Series.Add(new LineSeries() { Title = "Temperature", Color = OxyColor.Parse("#FFFF0000") });
            HumidityPlotModel.Series.Add(new LineSeries() { Title = "Humidity", Color = OxyColor.Parse("#006400") });
            PressurePlotModel.Series.Add(new LineSeries() { Title = "Pressure", Color = OxyColor.Parse("#0000FF") });
            
            StartButton = new ButtonCommand(StartTimer);
            StopButton = new ButtonCommand(StopTimer);
            UpdateConfigButton = new ButtonCommand(UpdateConfig);
            DefaultConfigButton = new ButtonCommand(DefaultConfig);

            ipAddress = config.IpAddress;
            sampleTime = config.SampleTime;

            Server = new IoTServer(IpAddress);
        }





        /**
          * @brief Time series plot update procedure.
          * @param t X axis data: Time stamp [ms].
          * @param d Y axis data: Real-time measurement [-].
          */
        private void UpdatePlot(double t, double measurement, PlotModel GivenPlotModel)
        {
            LineSeries lineSeries1 = GivenPlotModel.Series[0] as LineSeries;

            lineSeries1.Points.Add(new DataPoint(t, measurement));

            if (lineSeries1.Points.Count > config.MaxSampleNumber)
            {
                lineSeries1.Points.RemoveAt(0);
            }

            if (t >= config.XAxisMax)
            {
                GivenPlotModel.Axes[0].Minimum = (t - config.XAxisMax);
                GivenPlotModel.Axes[0].Maximum = t + config.SampleTime / 1000.0; ;
            }

            GivenPlotModel.InvalidatePlot(true);
        }



        /**
          * @brief Asynchronous chart update procedure with
          *        data obtained from IoT server responses.
          * @param ip IoT server IP address.
          */
        private async void UpdatePlotWithServerResponse()
        {
#if CLIENT
#if GET
            string responseText = await Server.GETwithClient();
#else
            string responseText = await Server.POSTwithClient();
#endif
#else
#if GET
            string responseText = await Server.GETwithRequest();
#else
            string responseText = await Server.POSTwithRequest();
#endif
#endif
            try
            {
#if DYNAMIC
                dynamic resposneJson = JObject.Parse(responseText);
                UpdatePlot(timeStamp / 1000.0, (double)resposneJson.temperature, TemperaturePlotModel);
                UpdatePlot(timeStamp / 1000.0, (double)resposneJson.humidity, HumidityPlotModel);
                UpdatePlot(timeStamp / 1000.0, (double)resposneJson.pressure, PressurePlotModel);

#else
                ServerData resposneJson = JsonConvert.DeserializeObject<ServerData>(responseText);
                UpdatePlot(timeStamp / 1000.0, resposneJson.data);
#endif
            }
            catch (Exception e)
            {
                Debug.WriteLine("JSON DATA ERROR");
                Debug.WriteLine(responseText);
                Debug.WriteLine(e);
            }

            timeStamp += config.SampleTime;
        }

        /**
          * @brief Synchronous procedure for request queries to the IoT server.
          * @param sender Source of the event: RequestTimer.
          * @param e An System.Timers.ElapsedEventArgs object that contains the event data.
          */
        private void RequestTimerElapsed(object sender, ElapsedEventArgs e)
        {
            UpdatePlotWithServerResponse();
        }





        #region ButtonCommands

        /**
         * @brief RequestTimer start procedure.
         */
        private void StartTimer()
        {
            if (RequestTimer == null)
            {
                RequestTimer = new Timer(config.SampleTime);
                RequestTimer.Elapsed += new ElapsedEventHandler(RequestTimerElapsed);
                RequestTimer.Enabled = true;

                PressurePlotModel.ResetAllAxes();
                TemperaturePlotModel.ResetAllAxes();
                HumidityPlotModel.ResetAllAxes();
            }
        }

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

            if (restartTimer)
                StartTimer();
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

            if (restartTimer)
                StartTimer();
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