import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  Grid
} from '@material-ui/core';

import DocOnly from './DocOnly';
import StrategyDoc from './StrategyDoc';
import PhaseDoc from './PhaseDoc';
import SituationDoc from './SituationDoc';
import ConditionDoc from './Conditions';

import {
  Introduction,
  Strategies,
  SubStrategies,
  Points,
  Phases,
  Situations,
  Conditions,
  StrategyEvents,
  Trigger,
  Rejected,
  EntryPoint,
  TakeProfit,
  StopLoss,
  BuyOrder,
  SellOrder
} from './docs'

export class ViewRoutes extends React.Component {
  render () {
    const { classes, view, ...other } = this.props;
    switch (view) {
      case 'Strategies':
        return <DocOnly content={Strategies} {...other} />;
        break;
      case 'Strategy Events':
        return <DocOnly content={StrategyEvents} {...other} />;
        break;
      case 'Trigger':
        return <DocOnly content={Trigger} {...other} />;
        break;
      case 'Rejected':
        return <DocOnly content={Rejected} {...other} />;
        break;
      case 'EntryPoint':
        return <StrategyDoc content={EntryPoint} {...other} />;
        break;
      case 'TakeProfit':
        return <StrategyDoc content={TakeProfit} {...other} />;
        break;
      case 'StopLoss':
        return <DocOnly content={StopLoss} {...other} />;
        break;
      case 'BuyOrder':
        return <DocOnly content={BuyOrder} {...other} />;
        break;
      case 'SellOrder':
        return <DocOnly content={SellOrder} {...other} />;
        break;
      case 'Substrategies':
        return <StrategyDoc content={SubStrategies} {...other} />;
        break;
      case 'Points':
        return <DocOnly content={Points} {...other} />;
        break;
      case 'Phase Code':
      case 'Phases':
        return <PhaseDoc content={Phases} view={view} {...other} />;
        break;
      case 'Situations':
        return <SituationDoc content={Situations} {...other} />;
        break;
      case 'Conditions':
        return <ConditionDoc content={Conditions} {...other} view={view} />;
        break;
      case 'Introduction':
      default:
        return <DocOnly content={Introduction} {...other} />;
    }
  }
}

export default withStyles(styles)(ViewRoutes);
