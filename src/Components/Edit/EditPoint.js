import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography, Button } from '@material-ui/core';
import { ExpandItemWrapper } from '../Common';
import EditSituation from './EditSituation';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import { isDefined } from '../../utils';

class EditPoint extends React.Component {
  render() {
    const { classes, index, sectionName, point, phsIndex, situations, updatePoint, changed, submitSave } = this.props;

    return (
      <ExpandItemWrapper sectionName={sectionName} >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} >
            <Typography
              variant='h6'
              align='left'
              color='textPrimary'
              gutterBottom
            >
              Situations
            </Typography>
          </Grid>
          <Grid item xs={12} >
            {situations.length > 0 &&
              situations.map((situation, sitIndex) => (
                <EditSituation
                  key={sitIndex}
                  point={point}
                  situation={situation}
                  phsIndex={isDefined(phsIndex) ? phsIndex : null}
                  sitIndex={sitIndex}
                  updatePoint={updatePoint}
                  changed={changed}
                  submitSave={submitSave}
                />
              ))
            }
            <Button
              className={classes.addButton}
              color="secondary"
              variant="contained"
              fullWidth={true}
              onClick={e => updatePoint(e, 'entryPoint', 'addSituation', null, null, null)}
            >
              + Add Situation
            </Button>
          </Grid>
        </Grid>
      </ExpandItemWrapper>
    );
  }
}

export default withStyles(styles)(EditPoint);
