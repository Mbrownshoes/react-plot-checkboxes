import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


export function CheckboxLabels({options, onChange, units}) {
  console.log(options)

  return (
    <FormGroup style={{ display: "flex" }} row>
      {options.map((value, i) => (
        value === 'ucur' ? <FormControlLabel control={<Checkbox
          onChange={() => onChange(i)}
          key={i}
          defaultChecked />} label={units[i]} />
          : <FormControlLabel control={<Checkbox
            onChange={() => onChange(i)}
            key={i}
            />} label={units[i]} />


      ))
      }
    </FormGroup>
  );
}
