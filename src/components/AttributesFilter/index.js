import FilterWrapper from 'components/FilterWrapper';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormatListBulleted } from '@material-ui/icons';
import { useApi } from 'api';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles.module.scss';

const useStyles = makeStyles(() => ({
  body: {
    display: 'grid',
    gridGap: '8px',
    height: '200px',
    overflowY: 'scroll',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
  },
}));

function groupBy(xs, f) {
  return xs.reduce(
    // eslint-disable-next-line no-sequences
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
}

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#6dbafc',
    },
    color: 'var(--color-text)',
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const AttributeOption = ({
  name,
  title,
  checked,
  disabled,
  onChange,
  count,
}) => (
  <FormControlLabel
    classes={{ root: styles.optionPanel }}
    control={
      <CustomCheckbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    }
    label={
      <div className={styles.option}>
        <div className={styles.optionTitle}>
          {title} ({count})
        </div>
      </div>
    }
    style={{ marginLeft: 'unset', marginRight: 'unset' }}
  />
);

const AttributesFilter = ({ address, onChange }) => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const { getAttributes } = useApi();

  const handleChange = att => {
    let newAttributes;
    if (selected.find(s => s === att.value._id)) {
      // remove the attribute from selected
      newAttributes = selected.filter(a => a !== att.value._id);
    } else {
      // add the attribute to selected
      newAttributes = [...selected, att.value._id];
    }
    setSelected(newAttributes);
  };

  const fetchAttributes = async () => {
    const data = await getAttributes(address);
    const allAttributes = data.attributes;

    const options = allAttributes.map(att => {
      return { value: att, label: `${att.value}` };
    });

    const _groupedOptions = groupBy(options, o => o.value.traitType);
    const groupedOptions = Object.keys(_groupedOptions).map(key => {
      return { label: key, options: _groupedOptions[key] };
    });

    setOptions(groupedOptions);
  };

  useEffect(() => {
    if (address) {
      fetchAttributes();
    }
  }, [address]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      {options.length > 0 &&
        options.map((option, idx) => (
          <FilterWrapper
            key={idx}
            title={
              <div className={classes.titleContainer}>
                <FormatListBulleted /> {option.label}
              </div>
            }
            classes={{ body: classes.body }}
          >
            {option.options &&
              option.options.map((att, idx) => (
                <AttributeOption
                  name={att.value.value}
                  title={att.value.value}
                  onChange={() => handleChange(att)}
                  key={idx}
                  count={att.value.nbOccurences || 0}
                />
              ))}
          </FilterWrapper>
        ))}
    </>
  );
};

export default AttributesFilter;
