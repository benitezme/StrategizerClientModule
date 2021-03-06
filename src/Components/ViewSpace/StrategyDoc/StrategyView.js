import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../styles';
import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { slugify } from '../../../utils';

export class StrategyView extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name: props.strategy.name
    }
  }
  render () {
    const { classes, content, strategy, stratIndex, updatePoint, toggleEdit } = this.props;
    return (
      <Card>
        <List>
          <ListItem>
            <ListItemText primary={`Strategy Name: ${strategy.name}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Edit Strategy Name" onClick={e => toggleEdit(e)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={'Warning: This will delete all nested phases, situations and conditions'} />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                aria-label="Delete Strategy"
                onClick={e => updatePoint(null, null,'deleteStrategy', stratIndex, null, null, null, null)}
              >
                <DeleteIcon /> Delete Strategy
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    )
  }
}

export default withStyles(styles)(StrategyView);
