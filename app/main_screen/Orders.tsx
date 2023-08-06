'use client'

import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Collapse, IconButton, TextField } from '@mui/material';

interface Budget {
  id: string;
  name: string;
  status: string;
  created_at: string;
  total_planned: number;
  total_spent: number;
  categories: Category[];
}

interface Category {
  name: string;
  planned_amount: number;
  actual_amount: number;
}

export default function Orders() {
  const budgets: Budget[] = [
    {
      "id": "budgetId123",
      "name": "July 2023",
      "status": "active",
      "created_at": "2023-07-31T00:00:00Z",
      "total_planned": 6000,
      "total_spent": 4000,
      "categories": [
        {
          "name": "Продукти",
          "planned_amount": 5000,
          "actual_amount": 4900
        },
        {
          "name": "Розваги",
          "planned_amount": 1000,
          "actual_amount": 2000
        }
      ]
    },
    {
      "id": "budgetId124",
      "name": "August 2023",
      "status": "inactive",
      "created_at": "2023-06-30T00:00:00Z",
      "total_planned": 7000,
      "total_spent": 6000,
      "categories": [
        {
          "name": "Одяг",
          "planned_amount": 3000,
          "actual_amount": 2900
        },
        {
          "name": "Освіта",
          "planned_amount": 4000,
          "actual_amount": 3500
        }
      ]
    }
  ];

  const [open, setOpen] = useState<number[]>([]);

  const handleGroupClick = (monthIndex: number) => {
    const currentIndex = open.indexOf(monthIndex);
    const newOpen = [...open];
    if (currentIndex === -1) {
      newOpen.push(monthIndex);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setOpen(newOpen);
  };

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'Month'}</TableCell>
            <TableCell>{'Category'}</TableCell>
            <TableCell>{'Planned Amount'}</TableCell>
            <TableCell>{'Actual Amount'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgets.map((budget, monthIndex) => (
            <React.Fragment key={budget.id}>
              <TableRow>
                <TableCell>
                  <IconButton onClick={() => handleGroupClick(monthIndex)}>
                    {open.includes(monthIndex) ? '-' : '+'}
                  </IconButton>
                  {budget.name}
                </TableCell>
                <TableCell />
                <TableCell>{budget.total_planned}</TableCell>
                <TableCell>{budget.total_spent}</TableCell>
              </TableRow>
              {open.includes(monthIndex) &&
                budget.categories.map((category, categoryIndex) => (
                  <TableRow key={`${budget.id}-${categoryIndex}`}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell />
                    <TableCell>
                      <TextField
                        type="number"
                        defaultValue={category.planned_amount}
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        defaultValue={category.actual_amount}
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
