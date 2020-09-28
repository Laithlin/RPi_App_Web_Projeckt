#!/usr/bin/python3

##**********************************************
# Server script for Rpi to use SenseHat sensors
# Based on materials from classes
# author: KFP
##**********************************************

## Importing packages

import sys
from sense_hat import SenseHat

## Setting up variables

sense = SenseHat()

## Getting data from sensors

def getresource(id):
    res = '[null]'
    if id == 'env':
        t = sense.get_temperature()
        p = sense.get_pressure()
        h = sense.get_humidity()
        res = ('[{"name":"temperature","value":' + str(t) + ',"unit":"C"},' +
               '{"name":"pressure","value":' + str(p) + ',"unit":"hPa"},'  +
               '{"name":"humidity","value":' + str(h) + ',"unit":"%"},'    +
               '{"name":"random","value":' + str(rnd.random()) + ',"unit":"-"}]')

    if id == 'rpy':
        rpy = sense.get_orientation_degrees()
        res = ('[{"name":"roll","value":' + str(rpy['roll']) + ',"unit":"deg"},'   +
                '{"name":"pitch","value":' + str(rpy['pitch']) + ',"unit":"deg"},' +
                '{"name":"yaw","value":' + str(rpy['yaw']) + ',"unit":"deg"},'     +
                '{"name":"random","value":' + str(rnd.random()) + ',"unit":"-"}]')

    return res

if len(sys.argv) > 1:
    print(getresource(sys.argv[1]))
else:
    print('[]')
