import React from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  Grid,
  Typography,
  List
} from '@material-ui/core';

import Teams from './Teams';
import FBs from './FBs';
import Strategies from './Strategies';
import OrderPoint from './OrderPoint';
import ViewEdit from '../ViewSpace';

import { isDefined } from '../../utils';

class Layout extends React.Component {
  constructor (props) {
    super(props);

    this.updatePoint = this.updatePoint.bind(this);
    this.submitSave = this.submitSave.bind(this);
    this.setTeam = this.setTeam.bind(this);
    this.setFB = this.setFB.bind(this);
    this.setPhase = this.setPhase.bind(this);
    this.setStrategy = this.setStrategy.bind(this);
    this.setSituation = this.setSituation.bind(this);
    this.setCondition = this.setCondition.bind(this);
    this.setView = this.setView.bind(this);

    let defaultTeam = null;
    let defaultFB = null;
    let defaultStrategy = null;
    let defaultPoint = null;
    let defaultPhase = null;
    let defaultSituation = null;
    let defaultCondition = null;


    if(!props.listStrategies.loading && isDefined(props.listStrategies.teams_TeamsByOwner)){
      console.log('layout constructor', props.listStrategies);
      const teams = props.listStrategies.teams_TeamsByOwner;
      const fbs = teams[0].fb;

      const simFbs = fbs.filter((fb, index) => {
        const testSim = /simulator-/.test(fb.slug);
        if(testSim){
          return fb;
        }
      })

      defaultTeam = props.listStrategies.teams_TeamsByOwner[0];
      defaultFB = simFbs[0];
      defaultStrategy = defaultFB.strategy.subStrategies[0];
      defaultPoint = defaultStrategy.entryPoint;
      defaultSituation = defaultPoint.situations[0];
      defaultCondition = defaultSituation.conditions[0];
      // console.log(simFbs);
      // const strategies = simFbs[0].strategy.subStrategies;
      // const strategy = strategies[0];
    }

    this.state = {
      team: defaultTeam,
      fb: defaultFB,
      strategy: defaultStrategy,
      point: defaultPoint,
      phase: defaultPhase,
      situation: defaultSituation,
      condition: defaultCondition,
      /*
      fb: simFbs[0].slug,

      strategy: strategy,
      index: 0,
      name: strategy.name,
      entryPoint: strategy.entryPoint,
      exitPoint: strategy.exitPoint,
      sellPoint: strategy.sellPoint,
      buyPoint: strategy.buyPoint,
      stopLoss: strategy.stopLoss,
      buyOrder: strategy.buyOrder,
      sellOrder: strategy.sellOrder,
      */
      changed: false,
      saved: false
    }
  }

  componentDidUpdate(prevProps) {
    console.log('Layout componentDidUpdate: ', prevProps, this.props)
  // Typical usage (don't forget to compare props):
  if (prevProps.listStrategies.loading && !this.props.listStrategies.loading) {
    const teams = props.listStrategies.teams_TeamsByOwner;
    const fbs = teams[0].fb;

    const simFbs = fbs.filter((fb, index) => {
      const testSim = /simulator-/.test(fb.slug);
      if(testSim){
        return fb;
      }
    })

    defaultTeam = props.listStrategies.teams_TeamsByOwner[0];
    defaultFB = simFbs[0];
    defaultStrategy = defaultFB.strategy.subStrategies[0];
    defaultPoint = defaultStrategy.entryPoint;
    defaultPhase = null;
    defaultSituation = defaultPoint.situations[0];
    defaultCondition = defaultSituation.condition[0];

    this.setState({
      team: defaultTeam,
      fb: defaultFB,
      strategy: defaultStrategy,
      point: defaultPoint,
      phase: defaultPhase,
      situation: defaultSituation,
      condition: defaultCondition
    });
  }
}

  render () {
    const { classes, listStrategies, saveStrategy, createStrategy } = this.props;
    console.log(this.state);
    const teams = listStrategies.teams_TeamsByOwner;
    const fbs = teams[0].fb;

    const simFbs = fbs.filter((fb, index) => {
      const testSim = /simulator-/.test(fb.slug);
      if(testSim){
        return fb;
      }
    })

    const strategies = this.state.fb.strategy.subStrategies;
    const points = this.state.strategy;

    return (
      <Grid item
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <List className={classes.strategyList}>
                <Strategies
                  strategies={strategies}
                  strategy={this.state.strategy}
                  setStrategy={this.setStrategy}
                  updatePoint={this.updatePoint}
                  setView={this.setView}
                />
              </List>
              <List className={classes.pointList}>
                <OrderPoint
                  points={points}
                  point={this.state.point}
                  phase={this.state.phase}
                  situation={this.state.situation}
                  setPoint={this.setPoint}
                  setPhase={this.setPhase}
                  setSituation={this.setSituation}
                  updatePoint={this.updatePoint}
                />
              </List>
              <List className={classes.teamsList}>
                <Teams
                  teams={listStrategies.teams_TeamsByOwner}
                  team={this.state.team}
                  setTeam={this.setTeam}
                />
                <FBs
                  fbs={simFbs}
                  fb={this.state.fb}
                  setFB={this.setFB}
                />
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={8}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <ViewEdit />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  setTeam = (team) => {
    this.setState(state => ({ team: team }));
  };
  setFB = (fb) => {
    this.setState(state => ({ fb: fb }));
  };

  setStrategy = (strategy) => {
    this.setState(state => ({ strategy: strategy }));
  };

  setPoint = (point) => {
    this.setState(state => ({ point: point }));
  };

  setPhase = (phase) => {
    this.setState(state => ({ phase: phase }));
  };

  setSituation = (situation) => {
    this.setState(state => ({ situation: situation }));
  };

  setCondition = (condition) => {
    this.setState(state => ({ condition: condition }));
  };

  updatePoint (e, point, type, strIndex, phsIndex, sitIndex, conIndex, element) {
    let currState = this.state;
    let currStrategy = currState.strategy;
    let currPoint = currStrategy[point];
    console.log('updatePoint: ', e, point, type, strIndex, phsIndex, sitIndex, conIndex, element, currPoint);

    switch (type) {
      case 'addPhase':
        currPoint.phases.push({
          name: 'New Phase',
          code: 'Code for new phase',
          situations: []
        });
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'addSituation':
        if(isDefined(currPoint.phases)){
          console.log('addSituation Phase: ', phsIndex, currPoint.phases[phsIndex]);
          currPoint.phases[phsIndex].situations.push({
            name: 'New Situation',
            conditions: []
          });
        } else {
          currPoint.situations.push({
            name: 'New Situation',
            conditions: []
          });
        }
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'addCondition':
        if(isDefined(currPoint.phases)){
          currPoint.phases[phsIndex].situations[sitIndex].conditions.push({
            name: 'New Condition',
            code: 'Code for new Condition'
          });
        } else {
          currPoint.situations[sitIndex].conditions.push({
            name: 'New Condition',
            code: 'Code for new Condition'
          });
        }
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'updateStrategy':
        if(isDefined(currStrategy)){
          if(element === 'actif'){
            currStrategy.actif = e;
          } else {
            currStrategy.name = e;
          }
          console.log('updateStrategy: ', currStrategy);
        }
        this.setState({
          strategy: currStrategy
        });
        this.saveStrategy(strIndex, );
        break;
      case 'updatePhase':
        if(isDefined(currPoint.phases)){
          if(element === 'name'){
            currPoint.phases[phsIndex].name = e;
          } else {
            currPoint.phases[phsIndex].code = e;
          }
          console.log('updateCondition w Phase: ', currPoint);
        } else {
          if(element === 'name'){
            currPoint.phases[phsIndex].situations[sitIndex].conditions[conIndex].name = e;
          } else {
            currPoint.phases[phsIndex].situations[sitIndex].conditions[conIndex].code = e;
          }
          console.log('updateCondition w Phase: ', currPoint);
        }
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'updateSituation':
        if(isDefined(currPoint.phases)){
          currPoint.phases[phsIndex].situations[sitIndex].name = e;
        } else {
          currPoint.situations[sitIndex].name = e;
        }
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'updateCondition':
        if(isDefined(currPoint.phases) && currPoint.phases !== null){
          if(element === 'name'){
            currPoint.phases[phsIndex].situations[sitIndex].conditions[conIndex].name = e
          } else {
            currPoint.phases[phsIndex].situations[sitIndex].conditions[conIndex].code = e;
          }
          console.log('updateCondition w Phase: ', currPoint);
        } else {
          if(element === 'name'){
            currPoint.situations[sitIndex].conditions[conIndex].name = e;
          } else {
            currPoint.situations[sitIndex].conditions[conIndex].code = e;
          }
          console.log('updateCondition w Phase: ', currPoint);
        }
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      case 'deletePhase':
        if(isDefined(currPoint.phases)){
          let filtered = array.filter((value, index, arr) => {
              return value !== phsIndex;
          });
          currPoint.phases = filtered
        }
        console.log('deletePhase', currPoint.phases);
        this.setState({
          [point]: currPoint,
          changed: true
        });
        break;
      default:
        throw new Error();
    }
    console.log('Post updatePoint: ', e, point, type, phsIndex, sitIndex, conIndex, this.state);
  }

  setView (e, view) {
    this.setState({
      view: view,
    });
  }

  async submitSave(e){
    e.preventDefault();

    const { handleSaveStrategy, saveStrategy, id, strategies } = this.props;
    const {
      index,
      name,
      entryPoint,
      exitPoint,
      sellPoint,
      buyPoint,
      stopLoss,
      buyOrder,
      sellOrder
    } = this.state;

    const stratIndex = index;

    const strategy = {
      name,
      entryPoint,
      exitPoint,
      sellPoint,
      buyPoint,
      stopLoss,
      buyOrder,
      sellOrder
    };
    console.log('submitSave: ', id, strategies, stratIndex, strategy);
    strategies.subStrategies[stratIndex]=strategy;

    let saved = await handleSaveStrategy(saveStrategy, strategies.subStrategies, id);

    console.log('submitSave: ', await saved);

    this.setState({ saved: true, changed: false });
  }

  async saveStrategy(strIndex){

    const { handleSaveStrategy, saveStrategy, id, strategies } = this.props;
    const {
      index,
      name,
      entryPoint,
      exitPoint,
      sellPoint,
      buyPoint,
      stopLoss,
      buyOrder,
      sellOrder
    } = this.state;

    const strategy = {
      name,
      entryPoint,
      exitPoint,
      sellPoint,
      buyPoint,
      stopLoss,
      buyOrder,
      sellOrder
    };
    console.log('saveStrategy: ', id, strategies, strIndex, strategy);
    strategies.subStrategies[strIndex]=strategy;

    let saved = await handleSaveStrategy(saveStrategy, strategies.subStrategies, id);

    console.log('saveStrategy saved: ', await saved);

    this.setState({ saved: true, changed: false });
  }

}

export default withStyles(styles)(Layout);
