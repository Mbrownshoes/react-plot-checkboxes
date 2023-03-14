import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function valueLabelFormat(value) {
  
  let slideDate = new Date(value)
  // console.log(value,new Date(value))
  return `${slideDate}`;
}

export default function TimeSlider({ value, startTime, endTime, onChange }) {

  // console.log(value,startTime, endTime)
  return (
    <Box sx={{ width: 250}}>
      {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

      </Stack> */}
      <Typography id="non-linear-slider" gutterBottom>
         {valueLabelFormat(value)}
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={startTime}
        max={endTime}
        step={3600000}
        />
      <TextField label="" value={new Date(startTime)} size="small" readOnly />
      <TextField label="" value={new Date(endTime)} size="small" readOnly />
    </Box>
    // <Box width={300}>
    //   <Stack m={2} gap={2}>
    //     <Slider value={value} aria-label="Default" valueLabelDisplay="off" min={+startTime}
    //       max={+endTime} onChange={onChange} />
    //     <TextField label="start date" value={new Date(value[0])} size="small" readOnly />
    //     <TextField label="end date" value={new Date(value[1])} size="small" readOnly />
    //   </Stack>
    // </Box>
  );
}
