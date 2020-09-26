#!/usr/bin/python3

#***********************************************
# Server script for Rpi to use SenseHat joystick
# author: KFP
#***********************************************

## Importing packages

from sense_hat import SenseHat
import json

## Setting up variables

sense = SenseHat()

y_position = x_position = b_counter = 0

fil = open('joystick.dat', 'w') #joystick current state

## Main loop
try:
    while True:
        ## Sensing events
        for event in sense.stick.get_events():
            if event.action in ('pressed', 'held'):
                fil = open('joystick.dat', 'w') #joystick current state
                x_position = (x_position + {'left': -1, 'right': 1,}.get(event.direction, 0))
                y_position = (y_position + {'up': -1, 'down': 1,}.get(event.direction, 0))
                if event.action in ('pressed'):
                    b_counter = (b_counter + {'middle': 1,}.get(event.direction, 0))
                if event.action in ('held'):
                    b_counter = (b_counter + {'middle': -1,}.get(event.direction, 0))

                json_data = json.dumps({"Joystick":{"x":x_position,"y":y_position,"button":b_counter}}) #creating json
                fil.write(json_data)#writing json to file
                fil.write('\n')
                fil.close()

except (KeyboardInterrupt, SystemExit):
    fil.close()
    exit()

#-----------------------------------------------------------------------------------------------------
