import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import ExpandItemWrapper from './ExpandItemWrapper';
import ViewPhase from './ViewPhase';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class StopLoss extends React.Component {
  render() {
    const { classes, index, sectionName, phases } = this.props;

    return (
      <ExpandItemWrapper sectionName={sectionName}>
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
              Phases
            </Typography>
          </Grid>
          <Grid item xs={12} >
            {phases.length > 0 &&
              phases.map((phase, index) => <ViewPhase key={index} phase={phase} index={index} />)
            }
            {phases.length === 0 &&
              <Typography
                variant='subtitle1'
                align='left'
                color='textPrimary'
                gutterBottom
              >
                No phases have been created for this section.
              </Typography>
            }
          </Grid>
        </Grid>
      </ExpandItemWrapper>
    );
  }
}

export default withStyles(styles)(StopLoss);
