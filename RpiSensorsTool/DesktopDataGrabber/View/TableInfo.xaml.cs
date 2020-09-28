using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;


namespace DesktopDataGrabber.View
{
    /** 
     * @brief Interaction logic for TableInfo.xaml 
     */
    public partial class TableInfo : Window
    {
        bool isMenuVisible = true;

        public TableInfo()
        {
            InitializeComponent();
        }

        /**
         * @brief Show and hide Menu
         */
        private void MenuBtn_Click(object sender, RoutedEventArgs e)
        {
            isMenuVisible = !isMenuVisible;

            if (isMenuVisible)
                this.Menu.Visibility = Visibility.Visible;
            else
                this.Menu.Visibility = Visibility.Collapsed;
        }

        /**
         * @brief Go to Temperature window and close current one
         */
        private void TemperatureButton(object sender, RoutedEventArgs e)
        {
            Temperature temp = new Temperature();
            temp.Show();
            this.Close();
            
        }

        /**
         * @brief Go to Led window and close current one
         */
        private void LedsButton(object sender, RoutedEventArgs e)
        {
            Leds ledsy = new Leds();
            ledsy.Show();
            this.Close();
        }

        /**
         * @brief Go to RPY window and close current one
         */
        private void RPYButton(object sender, RoutedEventArgs e)
        {
            MainWindow rpy = new MainWindow();
            rpy.Show();
            this.Close();
        }
        /*
         * @brief Go to TableInfo window and close current one
         */
        private void TableInfoButton(object sender, RoutedEventArgs e)
        {
            TableInfo table = new TableInfo();
            table.Show();
            this.Close();
        }
        /*
         * @brief Go to Joystick window and close current one
         */
        private void JoyButton(object sender, RoutedEventArgs e)
        {
            Joystick ledsy = new Joystick();
            ledsy.Show();
            this.Close();
        }
    }
}
