import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Grid, Typography, List } from '@material-ui/core';
import { ExpandItemWrapper } from '../Common';
import EditCondition from './EditCondition';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import { isDefined } from '../../utils';

export class EditSituation extends React.Component {
  render() {
    console.log('EditSituation: ', this.props);
    const { classes, point, phsIndex, sitIndex, updatePoint, changed, submitSave } = this.props;
    const { name, conditions } = this.props.situation;
    let phaseIndex = isDefined(phsIndex) ? phsIndex : null;
    return (
      <ExpandItemWrapper
        sectionName={`Situation: ${name}`}
        style={classes.expansionSituation}
        defaultExpanded={conditions.length > 3 ? false : true}
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >

          <Grid item xs={12} >
            <List className={classes.root}>
              {conditions.length > 0 &&
                conditions.map((condition, condIndex) => (
                  <EditCondition
                    key={condIndex}
                    name={condition.name}
                    condition={condition.code}
                    point={point}
                    index={condIndex}
                    phsIndex={phaseIndex}
                    sitIndex={sitIndex}
                    updatePoint={updatePoint}
                    classes={classes}
                    changed={changed}
                  />
                ))
              }

            </List>
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  className={classes.addButton}
                  color="secondary"
                  variant="contained"
                  fullWidth={true}
                  onClick={e => updatePoint(e, point, 'addCondition', phaseIndex, sitIndex, null)}
                >
                  + Add Condition
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.addButton}
                  color="primary"
                  variant={changed ? "contained" : "outlined"}
                  fullWidth={false}
                  disabled={changed ? false : true}
                  onClick={e => submitSave(e)}
                >
                  + Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ExpandItemWrapper>
    );
  }
}

export default withStyles(styles)(EditSituation);