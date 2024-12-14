import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel
        id="demo-controlled-radio-buttons-group"
        sx={{ fontSize: "18px", fontWeight: "700" }}
      >
        Сортировка по цене
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ display: "flex", flexFlow: "row", fontSize: "17px" }}
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="По возрастанию"
          sx={{ "& .MuiTypography-root": { fontSize: "16px" } }}
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="По убыванию"
          sx={{ "& .MuiTypography-root": { fontSize: "16px" } }}
        />
      </RadioGroup>
    </FormControl>
  );
}
