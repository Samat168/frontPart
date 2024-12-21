import * as React from "react";
import { TextField, Button, FormControl, FormLabel } from "@mui/material";

export default function DateRangeFilter({ onFilter }) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleApplyFilter = async () => {
    if (startDate && endDate) {
      try {
        const response = await fetch("http://localhost:8080/cars/sort", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startDate, endDate }),
        });

        if (!response.ok) {
          throw new Error("Ошибка при фильтрации машин.");
        }

        const availableCars = await response.json();
        console.log("Машины, доступные в диапазоне:", availableCars);

        // Передать данные через коллбэк
        if (onFilter) {
          onFilter(availableCars);
        }
      } catch (error) {
        console.error("Ошибка при выполнении фильтрации:", error);
        alert("Не удалось выполнить фильтрацию.");
      }
    } else {
      alert("Пожалуйста, выберите обе даты.");
    }
  };

  return (
    <FormControl>
      <FormLabel
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "16px",
        }}
      >
        Сортировка по диапазону дат
      </FormLabel>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            marginTop: "16px",
            justifyContent: "center",
          }}
        >
          Применить
        </Button>
      </div>
    </FormControl>
  );
}
