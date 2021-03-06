import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Grid, ListItem, ListItemText, TextField, FormGroup } from '@material-ui/core';
import { slugify } from '../../utils';

export const EditCondition = ({ classes, name, condition, point, phsIndex, sitIndex, index, updatePoint }) => (
  <ListItem>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <FormGroup>
          <TextField
            id={`${slugify(name)}-name-${index}`}
            label="Update Condition Name"
            value={name}
            onChange={e => updatePoint(e.target.value, point, 'updateCondition', phsIndex, sitIndex, index, 'name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            id={`${slugify(name)}-condition-${index}`}
            label="Update Condition"
            value={condition}
            onChange={e => updatePoint(e.target.value, point, 'updateCondition', phsIndex, sitIndex, index, 'code')}
            margin="normal"
          />
        </FormGroup>
      </Grid>
    </Grid>
  </ListItem>
)

export default EditCondition;
