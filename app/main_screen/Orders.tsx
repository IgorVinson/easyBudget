'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper, Input } from '@mui/material';

const data = [
  {
    "id": "budgetId123",
    "name": "Липень 2023",
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

export default function Orders() {
  const [editableData, setEditableData] = useState(data);

  const handleInputChange = (categoryId, field, value) => {
    setEditableData((prevData) =>
      prevData.map((item) => ({
        ...item,
        categories: item.categories.map((category) =>
          category.categoryId === categoryId ? { ...category, [field]: value } : category
        ),
      }))
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{editableData[0].name}</TableCell>
            <TableCell>{editableData[1].name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Категорії</TableCell>
            <TableCell>
              <TableCell>Запланована сума</TableCell>
              <TableCell>Фактична сума</TableCell>
            </TableCell>
            <TableCell>
              <TableCell>Запланована сума</TableCell>
              <TableCell>Фактична сума</TableCell>
            </TableCell>
          </TableRow>
          {editableData[0].categories.map((category, index) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={category.planned_amount}
                  onChange={(e) => handleInputChange(category.categoryId, 'planned_amount', e.target.value)}
                />
                <Input
                  type="number"
                  value={category.actual_amount}
                  onChange={(e) => handleInputChange(category.categoryId, 'actual_amount', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={editableData[1].categories[index].planned_amount}
                  onChange={(e) => handleInputChange(editableData[1].categories[index].categoryId, 'planned_amount', e.target.value)}
                />
                <Input
                  type="number"
                  value={editableData[1].categories[index].actual_amount}
                  onChange={(e) => handleInputChange(editableData[1].categories[index].categoryId, 'actual_amount', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}