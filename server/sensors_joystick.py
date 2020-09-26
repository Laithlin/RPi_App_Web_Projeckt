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

y_position = 0
x_position = 0
b_counter = 0

## Main loop
try:
    while True:
        ## Sensing events
        for event in sense.stick.get_events():
            if event.action == "pressed":
                fil = open('joystick.dat', 'w') #joystick current state
                if event.direction == "up":
                    y_position += 1
                if event.direction == "down":
                    y_position -= 1
                if event.direction == "left":
                    x_position -= 1
                if event.direction == "right":
                    x_position += 1
                if event.direction == "middle":
                    b_counter += 1

                json_data = json.dumps({"Joystick":{"x":x_position,"y":y_position,"button":b_counter}}) #creating json

                fil.write(json_data)#writing json to file
                fil.write('\n')
                fil.close()

except (KeyboardInterrupt, SystemExit):
    fil.close()
    exit()
