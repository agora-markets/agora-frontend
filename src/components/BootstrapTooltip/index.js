import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const useStylesBootstrap = makeStyles({
  arrow: {
    color: 'var(--border-box)',
  },
  tooltip: {
    backgroundColor: 'var(--border-box)',
    padding: '8px 16px',
    fontSize: 14,
  },
});

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default BootstrapTooltip;
