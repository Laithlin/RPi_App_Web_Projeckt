#!/usr/bin/python3

#***********************************************
# Server script for Rpi to use SenseHat LED's
# author: KFP
#***********************************************

## Importing packages

import json
from sense_hat import SenseHat

## Setting up variables

sense = SenseHat()

filename = "led_display.json"

## Getting data from file

if filename:
    with open(filename, 'r') as f:
        ledDisplayArray = json.load(f)

## Setting colors of LED's

for led in ledDisplayArray:
    sense.set_pixel(led[0],led[1],led[2],led[3],led[4])
