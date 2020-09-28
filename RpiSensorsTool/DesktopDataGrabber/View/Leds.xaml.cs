using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
     * @brief Interaction logic for Leds.xaml 
     */
    public partial class Leds : Window
    {
        bool isMenuVisible = true;

        /**
         * @brief Inicjalizacja 
         */
        public Leds()
        {
            InitializeComponent();
        }

        /**
         * @brief Chowanie i wysuwanie menu
         */
        private void MenuBtn_Click(object sender, RoutedEventArgs e)
        {
            isMenuVisible = !isMenuVisible;

            if (isMenuVisible)
                this.Menu.Visibility = Visibility.Visible;
            else
                this.Menu.Visibility = Visibility.Collapsed;
        }

        /*
         * @brief Przekierowanie do okna Temperature i zamknięcie obecnego
         */
        private void TemperatureButton(object sender, RoutedEventArgs e)
        {
            Temperature temp = new Temperature();
            temp.Show();
            this.Close();
        }

        /*
         * @brief Przekierowanie do okna TableInfo i zamknięcie obecnego
         */
        private void TableInfoButton(object sender, RoutedEventArgs e)
        {
            TableInfo table = new TableInfo();
            table.Show();
            this.Close();
        }

        /*
         * @brief Przekierowanie do okna Leds i zamknięcie obecnego
         */
        private void LedsButton(object sender, RoutedEventArgs e)
        {
            Leds ledsy = new Leds();
            ledsy.Show();
            this.Close();
        }
        private void RPYButton(object sender, RoutedEventArgs e)
        {
            MainWindow ledsy = new MainWindow();
            ledsy.Show();
            this.Close();
        }
        private void JoyButton(object sender, RoutedEventArgs e)
        {
            Joystick ledsy = new Joystick();
            ledsy.Show();
            this.Close();
        }

    }
}

