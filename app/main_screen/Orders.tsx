'use client';

import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Accordion,
  AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  },
  {
    "id": "budgetId125",
    "name": "Грудень 2023",
    "status": "inactive",
    "created_at": "2023-06-30T00:00:00Z",
    "total_planned": 4444,
    "total_spent": 2222,
    "categories": [
      {
        "name": "Одяг",
        "planned_amount": 222,
        "actual_amount": 2342,
        "categoryId": 5
      },
      {
        "name": "Освіта",
        "planned_amount": 4000,
        "actual_amount": 3500,
        "categoryId": 6
      }
    ]
  }
];

const BudgetAccordion = ({ budgetData }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleInputChange = (categoryId, field, value) => {
    // логіка зміни даних...
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
        <Typography>{budgetData.name}</Typography>
      </AccordionSummary>
      <Grid container component={Paper} style={{ padding: 16 }}>
        <Grid item xs={12}>
          <Typography>Категорії</Typography>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              {budgetData.categories.map((category) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Accordion>
  );
};

export default function Orders() {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <BudgetAccordion budgetData={item} />
        </Grid>
      ))}
    </Grid>
  );
}