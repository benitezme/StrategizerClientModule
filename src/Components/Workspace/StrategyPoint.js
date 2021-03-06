import React from 'react';

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Popper,
  Paper,
  Fade
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Selected from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';

import SituationPoints from './SituationPoints';
import PhasePoints from './PhasePoints';

const styles = theme => ({
  root: {
    backgroundColor: '#888',
    '&:hover':{
      backgroundColor: '#444'
    },
    cursor:'pointer'
  },
  itemTitleRoot: {
    backgroundColor: 'none'
  },
  primary:{
    color: '#fff',
    backgroundColor: 'none',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  strategyList: {
    padding: theme.spacing.unit * 1,
    width: '100%'
  },
  popover: {
    pointerEvents: 'none',
    position: 'absolute'
  },
  paper: {
    padding: theme.spacing.unit,
  }
});

export class OrderPoint extends React.Component {
  constructor (props) {
    super(props);

    this.handleOpenPoint = this.handleOpenPoint.bind(this);
    this.handleOpenPhase = this.handleOpenPhase.bind(this);
    this.handleSelectSit = this.handleSelectSit.bind(this);
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);

    this.state = {
      openPoint: "entryPoint",
      openPhase: 0,
      selectedSit: null,
      anchorEl: null,
      openedPopoverId: null
    }
  }

  render () {
    const {
      classes,
      points,
      stratIndex,
      point,
      pointIndex,
      phase,
      phaseIndex,
      situationIndex,
      situation,
      setPoint,
      setPhase,
      setSituation,
      updatePoint,
      strategyName,
      setView,
      view
    } = this.props;
    const { openedPopoverId, anchorEl } = this.state;

    return (
      <React.Fragment>
        <Grid item key='strategy-point-list-group-item'>
          <List className={classes.strategyList}>
            <ListItem className={classes.root} dense key="strategy-point-Title">
              <ListItemText
                primary={`Strategy Events: ${strategyName}`}
                primaryTypographyProps={{variant:'subtitle1'}}
                classes={{root: classes.itemTitleRoot, primary: classes.primary}}
                onClick={e => setView(e, 'Strategy Events')}
                onMouseEnter={(e) => this.handlePopoverOpen(e, 'popper-strat-events')}
                onMouseLeave={this.handlePopoverClose}
              />
              <Popper id={`popper-strat-events`} open={openedPopoverId === 'popper-strat-events'} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper classes={{root: classes.paper}}>
                      <Typography>View info about Strategy Events</Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </ListItem>
            <SituationPoints
              entryName="Trigger On"
              stratIndex={stratIndex}
              pointIndex="entryPoint"
              key="point-entryPoint"
              points={points}
              point={point}
              situation={situation}
              setPoint={setPoint}
              setSituation={setSituation}
              updatePoint={updatePoint}
              openPoint={this.state.openPoint}
              handleOpenPoint={this.handleOpenPoint}
              selected={this.state.openPoint === 'entryPoint'}
              setSituation={setSituation}
              setView={setView}
              view={view}
            />
            <SituationPoints
              entryName="Trigger Off"
              stratIndex={stratIndex}
              pointIndex="exitPoint"
              key="point-exitPoint"
              points={points}
              point={point}
              situation={situation}
              setPoint={setPoint}
              setSituation={setSituation}
              updatePoint={updatePoint}
              openPoint={this.state.openPoint}
              handleOpenPoint={this.handleOpenPoint}
              selected={this.state.openPoint === 'exitPoint'}
              setView={setView}
              view={view}
            />
          </List>
        </Grid>
      </React.Fragment>
    )
  }

  handleOpenPoint (e, pointIndex, view) {
    e.preventDefault();
    this.props.setPoint(pointIndex, view);
    this.setState(state => ({ openPoint: pointIndex }));
  };

  handleOpenPhase (e, phaseIndex, phaseItem, view) {
    e.preventDefault();
    console.log('handleOpenPhase: ', phaseIndex, phaseItem);
    this.props.setPhase(phaseItem, phaseIndex, view)
    this.setState(state => ({ openPhase: phaseIndex, selectedSit: null }));
  };

  handleSelectSit (phaseIndex, sitIndex) {
    this.setState(state => ({ openPhase: phaseIndex, selectedSit: sitIndex }));
  };

  handlePopoverOpen (e, popoverId) {
    this.setState({ anchorEl: e.currentTarget, openedPopoverId: popoverId });
  };

  handlePopoverClose () {
    this.setState({ anchorEl: null, openedPopoverId: null });
  };
}

export default withStyles(styles)(OrderPoint);
