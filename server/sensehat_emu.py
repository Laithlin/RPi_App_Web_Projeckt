#!/usr/bin/python3

##**********************************************
# Server script for Rpi to use SenseHat sensors
# Based on materials from classes
# author: KFP
##**********************************************

## Importing packages

import sys
import random
import json
from time import sleep
from sense_emu import SenseHat

## Setting up variables

sense = SenseHat()


 #joystick current state
## Getting data from sensors

try:
    while 1:
        file = open('chartdata_2.json', 'w')
        temperature = sense.get_temperature()
        pressure = sense.get_pressure()
        humidity = sense.get_humidity()
        rpy = sense.get_orientation_degrees()
        roll = rpy['roll']
        pitch = rpy['pitch']
        yaw = rpy['yaw']
        
        son = json.dumps({"data":{"TPH":{"temperature":temperature, "humidity":humidity, "pressure":pressure},"RPY":{"roll":roll, "pitch":pitch, "yaw":yaw}}})
        file.write(son)
        file.close()
        sleep(0.01)
    
except (KeyboardInterrupt, SystemExit):
    file.close()
    exit()