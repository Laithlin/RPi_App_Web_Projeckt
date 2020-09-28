#!/usr/bin/python3

##**********************************************
# Server script for Rpi to use SenseHat sensors
# Based on materials from classes
# author: KFP
##**********************************************

## Importing packages

import sys
from sense_hat import SenseHat
import time
## Setting up variables

sense = SenseHat()

fil = open('chartdata.json', 'w')
## Getting data from sensors
try:

    while True:
        t = sense.get_temperature()
        p = sense.get_pressure()
        h = sense.get_humidity()
        rpy = sense.get_orientation_degrees()
        res = ('[{"name":"roll","value":' + str(rpy['roll']) + ',"unit":"deg"},'    +
                '{"name":"pitch","value":' + str(rpy['pitch']) + ',"unit":"deg"},'  +
                '{"name":"yaw","value":' + str(rpy['yaw']) + ',"unit":"deg"},'      +
                '{"name":"temperature","value":' + str(t) + ',"unit":"C"},'         +
                '{"name":"pressure","value":' + str(p) + ',"unit":"hPa"},'          +
                '{"name":"humidity","value":' + str(h) + ',"unit":"%"}]')
        fil = open('chartdata.json', 'w')
        fil.write(res)
        fil.write('\n')
        fil.close()
        time.sleep(0.01)

except (KeyboardInterrupt, SystemExit):
    fil.close()
    exit()
