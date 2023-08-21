import FilterConstants from '../constants/filter.constants';

const FilterActions = {
  updateStatusFilter,
  updateCollectionsFilter,
  updateCategoryFilter,
  updateMediaTypeFilter,
  updateGroupTypeFilter,
  updateSortByFilter,
  updateVerifiedFilter,
  updateAttributeFilter
};

function updateVerifiedFilter(field, selected) {
  return dispatch => {
    dispatch(_updateVerifiedFilter(field, selected));
  };
}

const _updateVerifiedFilter = (field, selected) => {
  return {
    type: FilterConstants.UPDATE_VERIFIED_FILTER,
    field,
    selected,
  };
};

function updateStatusFilter(field, selected) {
  return dispatch => {
    dispatch(_updateStatusFilter(field, selected));
  };
}

const _updateStatusFilter = (field, selected) => {
  return {
    type: FilterConstants.UPDATE_STATUS_FILTER,
    field,
    selected,
  };
};

function updateCollectionsFilter(collections) {
  return dispatch => {
    dispatch(_updateCollectionsFilter(collections));
  };
}

const _updateCollectionsFilter = collections => {
  return {
    type: FilterConstants.UPDATE_COLLECTIONS_FILTER,
    collections,
  };
};

function updateCategoryFilter(category) {
  return dispatch => {
    dispatch(_updateCategoryFilter(category));
  };
}

const _updateCategoryFilter = category => {
  return {
    type: FilterConstants.UPDATE_CATEGORIES_FILTER,
    category,
  };
};

function updateMediaTypeFilter(mediaType) {
  return dispatch => {
    dispatch(_updateMediaTypeFilter(mediaType));
  };
}

const _updateMediaTypeFilter = mediaType => {
  return {
    type: FilterConstants.UPDATE_MEDIATYPE_FILTER,
    mediaType,
  };
};

function updateGroupTypeFilter(groupType) {
  return dispatch => {
    dispatch(_updateGroupTypeFilter(groupType));
  };
}

const _updateGroupTypeFilter = groupType => {
  return {
    type: FilterConstants.UPDATE_GROUP_TYPE_FILTER,
    groupType,
  };
};

function updateSortByFilter(sortBy) {
  return dispatch => {
    dispatch(_updateSortByFilter(sortBy));
  };
}

const _updateSortByFilter = sortBy => {
  return {
    type: FilterConstants.UPDATE_SORT_BY_FILTER,
    sortBy,
  };
};

function updateAttributeFilter(sortBy) {
  return dispatch => {
    dispatch(_updateAttributeFilter(sortBy));
  };
}

const _updateAttributeFilter = attributes => {
  return {
    type: FilterConstants.UPDATE_ATTRIBUTE_FILTER,
    attributes
  }
}

export default FilterActions;
