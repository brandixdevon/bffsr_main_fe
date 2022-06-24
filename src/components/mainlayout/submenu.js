import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';

export const secondaryListItems = ( 
    
    <div>
    <ListSubheader inset>Sign Out</ListSubheader>
    <ListItem dense={true} button component="a" href="/LOGIN">
      <ListItemIcon>
        <LockIcon style={{color:"red"}} />
      </ListItemIcon>
      <ListItemText style={{color:"red"}} primary="Log Out" />
    </ListItem>
  </div>);