import React from 'react';
import { Query } from 'react-apollo';

import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import ViewItem from './ViewItem';
import ViewWrapper from './ViewWrapper';
import { Loading, Error } from '../Common';
import { isDefined } from '../../utils';

import { LIST_STRATEGIES } from '../../GraphQL/Strategies'

class View extends React.Component {
  render() {
    const { classes } = this.props;
    const strategyIndex = this.props.match.params.index;
    const teamSlug = this.props.match.params.team;
    const fbSlug = this.props.match.params.slug;

    return (
      <Query
        query={LIST_STRATEGIES}
        fetchPolicy='network-only'
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          if (isDefined(loading) && loading) {
            return <ViewWrapper><Loading text="Strategies" /></ViewWrapper>
          }
          if(isDefined(error)) {
            console.log(error)
            // return <ViewWrapper><Error text={`Error: ${error}`} /></ViewWrapper>
          }

          let team0;
          let fb0;
          let strategy0;
          let strategies;
          console.log('LIST_STRATEGIES data:', data);
          if(data.teams_TeamsByOwner.length > 0){
            team0 = data.teams_TeamsByOwner[0];
              console.log('team0 data:', team0);
            if(team0.fb.length > 0){
              const fbs = team0.fb;
              let fbIndex
              fbs.map((bot, index)=>{
                if(bot.slug === fbSlug){
                  fbIndex = index;
                  return;
                }
              })
              fb0 = team0.fb[fbIndex];
              console.log(team0, fbIndex, fb0);
              if(isDefined(fb0.strategy)){
                strategy0 = fb0.strategy;
                console.log('strategy0 data:', strategy0);
                if(strategy0.subStrategies.length > 0){
                  strategies = strategy0.subStrategies;
                } else {
                  return (<Error text="This strategy has no subStrategies" />)
                }
              } else {
                return (<Error text="You have no strategies" />)
              }
            } else {
              return (<Error text="You don't have any finanical beings. Please create one!" />)
            }
          } else {
            return (<Error text="You don't have a team or any finanical beings. Please create one!" />)
          }

          let strategyData = strategies[strategyIndex];
          console.log('strategyData: ', strategyData);
          return (
            <ViewItem strategy={strategyData} index={strategyIndex} teamSlug={teamSlug} fbSlug={fbSlug} />
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(View);
