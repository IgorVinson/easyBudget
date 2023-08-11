import React from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper  } from '@mui/material';


const data = [
  {
    "id": "budgetId123",
    "name": "Липень 2023",
    "name2": "3000",
    "status": "active",
    "created_at": "2023-07-31T00:00:00Z",
    "total_planned": 6000,
    "total_spent": 4000,
    "categories": [
      {
        "name": "Продукти",
        "planned_amount": 5000,
        "actual_amount": 4900,
        "categoryId": 1
      },
      {
        "name": "Розваги",
        "planned_amount": 1000,
        "actual_amount": 2000,
        "categoryId": 2
      }
    ]
  },
  {
    "id": "budgetId124",
    "name": "Серпень 2023",
    "name2": "4000",
    "status": "inactive",
    "created_at": "2023-06-30T00:00:00Z",
    "total_planned": 7000,
    "total_spent": 6000,
    "categories": [
      {
        "name": "Одяг",
        "planned_amount": 3000,
        "actual_amount": 2900,
        "categoryId": 3
      },
      {
        "name": "Освіта",
        "planned_amount": 4000,
        "actual_amount": 3500,
        "categoryId": 4
      }
    ]
  }
];

export default function BudgetTable() {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell align="center" colSpan={2}>{data[0].name}</TableCell>
            <TableCell align="center" colSpan={2}>{data[1].name}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell>Категорії</TableCell>
            <TableCell align="center">Запланована сума</TableCell>
            <TableCell align="center">Фактична сума</TableCell>
            <TableCell align="center">Запланована сума</TableCell>
            <TableCell align="center">Фактична сума</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{data[0].categories[0].name}</TableCell>
            <TableCell align="center">{data[0].categories[0].planned_amount}</TableCell>
            <TableCell align="center">{data[0].categories[0].actual_amount}</TableCell>
            <TableCell align="center">{data[1].categories[0].planned_amount}</TableCell>
            <TableCell align="center">{data[1].categories[0].actual_amount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{data[0].categories[1].name}</TableCell>
            <TableCell align="center">{data[0].categories[1].planned_amount}</TableCell>
            <TableCell align="center">{data[0].categories[1].actual_amount}</TableCell>
            <TableCell align="center">{data[1].categories[1].planned_amount}</TableCell>
            <TableCell align="center">{data[1].categories[1].actual_amount}</TableCell>
          </TableRow>

        </TableBody>
      </Table>

    </TableContainer>

  );
}