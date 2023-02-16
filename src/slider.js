import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

export default function TimeSlider({value, startTime, endTime, onChange}) {

  return (
    <Box width={300}>
      <Stack m={2} gap={2}>
        <Slider value={value} aria-label="Default" valueLabelDisplay="off" min={+startTime}
          max={+endTime} onChange={onChange} />
        <TextField label="start date" value={new Date(value[0])} size="small" readOnly />
        <TextField label="end date" value={new Date(value[1])} size="small" readOnly />
      </Stack>
    </Box>
  );
}
