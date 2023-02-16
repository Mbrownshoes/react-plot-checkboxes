import * as React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function RadioButtonsGroup({options, onChange}) {
  // console.log(options)
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Variables</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="airTemperature"
        name="radio-buttons-group"
      >
         {options.map((value, i) => (
          <FormControlLabel value={value.variable} key={i} control={<Radio />} label={value.variable} onChange={() => onChange(i)} />

         ))
         }
 
      </RadioGroup>
    </FormControl>
  );
}

// export function CheckboxLabels({options, onChange, units}) {
//   console.log(options)

//   return (
//     <FormGroup style={{ display: "flex" }} row>
      // {options.map((value, i) => (
      //   value === 'ucur' ? <FormControlLabel control={<Checkbox
      //     onChange={() => onChange(i)}
      //     key={i}
      //     defaultChecked />} label={units[i]} />
      //     : <FormControlLabel control={<Checkbox
      //       onChange={() => onChange(i)}
      //       key={i}
      //       />} label={units[i]} />


      // ))
      // }
//     </FormGroup>
//   );
// }
