import ".././styles/livefeedpage.css";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useState, useEffect } from 'react';  
import Stream from "./stream.js"
import Select from "react-dropdown-select";

function BrightnessControl(value) {
    const [brightness, setBrightness] = useState(0);
      const url = `https://apps.beehivemonitoringscu.lol/control?var=brightness&val=${value}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to adjust brightness');
          }
        })
        .catch(error => {
          console.error('Error adjusting brightness:', error);
        });
}
function LightControl(value) {
    const [light, setlight] = useState(0);
      const url = `https://apps.beehivemonitoringscu.lol/control?var=lamp&val=${value}`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to adjust Light Module');
          }
        })
        .catch(error => {
          console.error('Error adjusting Light Module:', error);
        });
}
function FrameControl(value){
    const [frame, setFrame] = useState(0);
    const url = `https://apps.beehivemonitoringscu.lol/control?var=xclk&val=${value}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to adjust Frame Rate');
        }
      })
      .catch(error => {
        console.error('Error adjusting Frame Rate:', error);
      });
}


function LedText(value) {
    console.log("LED "+value)
    LightControl(value)
    return `${value}`;
  }
function BrightnessText(value) {
    console.log("Brightness "+value)
    BrightnessControl(value);
    return `${value}`;
}
function ClockText(value) {
    console.log("Clock: "+value)
    FrameControl(value)
    return `${value}`;
}

const marks = [
    {
      value: -2,
      label: '-2',
    },
    {
      value: -1,
      label: '-1',
    },
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
        value: 2,
        label: '2',
      },
  ];  
  const clockcycle = [
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
        value: 7,
        label: '7',
      },
      {
        value: 8,
        label: '8',
      },
      {
        value: 9,
        label: '9',
      },
      {
        value: 10,
        label: '10',
      },
      {
        value: 11,
        label: '11',
      },
      {
          value: 12,
          label: '12',
        },
    {
        value: 13,
        label: '13',
    },
    {
        value: 14,
        label: '14',
    },
    {
        value: 15,
        label: '15',
    },  
  ]; 
  const resolutions=[
    {
        value:11,
        label:"HD (1280 x 720)"

    },
    {
        value:10,
        label:"XGA (1024 x 768)"
    },
    {
        value:9,
        label:"SVGA (800 x 600)"
    },
    {
        value:8,
        label:"VGA (640 x 480)"
    },
    {
        value:7,
        label:"HVGA (480 x 320)"
    },
    {
        value:6,
        label:"CIF (400 x 296)"
    },
    {
        value:5,
        label:"QVGA (320 x 240)"
    },
    {
        value:3,
        label:"HQVGA (240 x 176)"
    },
    {
        value:1,
        label:"QQVGA (160 x 120)"
    },
    {
        value:0,
        label:"THUMB (96 x 96)"
    }
];
const HandleResolutionChange=(record) => {
    console.log(record[0].value)
    const url = `https://apps.beehivemonitoringscu.lol/control?var=framesize&val=${record[0].value}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to adjust resolution');
        }
      })
      .catch(error => {
        console.error('Error adjusting resolution:', error);
      });
}

const LiveFeedpage = () => {
    return (
        <div class ="viewpoint">
            <h1 class="title">Live Feed</h1>
            <div class="bord">
                <div class="stream">
                    <Stream/>
                </div>
            </div>
            <div class="settings">  
                <div class="LED Box">
                    <p1>LED Intensity:</p1>
                    <Box sx={{ width: 250 }}>
                        <Slider
                            aria-label="LED Intensity"
                            defaultValue={0}
                            getAriaValueText={LedText}
                            valueLabelDisplay="auto"
                            shiftStep={1}
                            step={1}
                            min={0}
                            max={100}
                        />
                    </Box>
                </div>
                <div class="Brightness Box">
                    <p1>Brightness Settings:</p1>
                    <Box sx={{ width: 250 }}>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={0}
                            getAriaValueText={BrightnessText}
                            step={1}
                            valueLabelDisplay="auto"
                            min={-2}
                            max={2}
                            marks={marks}
                            color=""
                        />
                    </Box>
                </div>
                <div class="ClockCycle">
                    <p1>Clock Cycle:</p1>
                    <Box sx={{ width: 250 }}>
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={6}
                                getAriaValueText={ClockText}
                                step={1}
                                valueLabelDisplay="auto"
                                min={3}
                                max={15}
                                marks={clockcycle}
                                color="secondary"
                            />
                        </Box>
                </div>
                <div class="Resolutions">
                    <p1>Resolutions:</p1>
                    <Select options={resolutions}  onChange={(record) => {HandleResolutionChange(record)}} />
                </div>
            </div>
        </div>
        
    );
};
export default LiveFeedpage;