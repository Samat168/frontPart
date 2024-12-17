import * as React from "react";
import { TextField, Button, FormControl, FormLabel } from "@mui/material";

export default function DateRangeFilter() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      console.log("Фильтр по датам:", { startDate, endDate });
      // Здесь можно вызвать функцию фильтрации, например:
      // filterByDateRange(startDate, endDate);
    } else {
      alert("Пожалуйста, выберите обе даты.");
    }
  };

  return (
    <FormControl>
      <FormLabel
        sx={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}
      >
        Сортировка по диапазону дат
      </FormLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          label="Начальная дата"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Конечная дата"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handleApplyFilter}
          sx={{ alignSelf: "flex-start", marginTop: "16px" }}
        >
          Применить
        </Button>
      </div>
    </FormControl>
  );
}
