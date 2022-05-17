import React from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import styles from './styles.scss';
import FilterActions from 'actions/filter.actions';
import FilterWrapper from 'components/FilterWrapper';
// import { StylesContext } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '8px',
  },
  formControl: {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)',
    },
    width: '100%',
    height: 40,
    boxSizing: 'border-box',

    border: '1px solid var(--color-text)',
    cursor: 'pointer',
    margin: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-box)',
  },
  selected: {
    background: 'rgba(255, 107, 199, 1)',
    color: '#FFF',
    fontWeight: 700,
    border: 0,
  },
}));

const ExploreStatus = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = useSelector(state => state.Filter);

  const handleStatusChange = (field, selected) => {
    dispatch(FilterActions.updateStatusFilter(field, selected));
  };

  return (
    <FilterWrapper
      title="Status"
      classes={{ body: classes.body }}
      style={{ color: 'blue' }}
    >
      <div
        className={cx(
          classes.formControl,
          statusBuyNow ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusBuyNow', !statusBuyNow)}
      >
        Buy Now
      </div>
      <div
        className={cx(
          classes.formControl,
          statusOnAuction ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusOnAuction', !statusOnAuction)}
      >
        On Auction
      </div>
      <div
        className={cx(
          classes.formControl,
          statusHasBids ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusHasBids', !statusHasBids)}
      >
        Has Bids
      </div>
      <div
        className={cx(
          classes.formControl,
          statusHasOffers ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusHasOffers', !statusHasOffers)}
      >
        Has Offers
      </div>
    </FilterWrapper>
  );
};

export default ExploreStatus;
