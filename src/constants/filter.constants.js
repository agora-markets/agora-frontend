import iconArt from 'assets/svgs/art-light.svg';
import iconCollectibles from 'assets/svgs/collectibles-light.svg';
import iconSports from 'assets/svgs/sports-light.svg';
import iconUtility from 'assets/svgs/utility-light.svg';
import iconTrading from 'assets/svgs/trading-cards-light.svg';
import iconVirtual from 'assets/svgs/virtual-worlds-light.svg';
import iconDomain from 'assets/svgs/domain-names-light.svg';
import iconMusic from 'assets/svgs/music-light.svg';

export const GroupFilters = [
  {
    value: 'all',
    label: 'All Items',
  },
  {
    value: 'single',
    label: 'Single Items',
  },
  // {
  //   value: 'bundle',
  //   label: 'Bundles',
  // },
];

export const Categories = [
  {
    id: 0,
    icon: iconArt,
    label: 'Art',
  },
  {
    id: 1,
    icon: iconCollectibles,
    label: 'Collectibles',
  },
  {
    id: 2,
    icon: iconSports,
    label: 'Sports',
  },
  {
    id: 3,
    icon: iconUtility,
    label: 'Utility',
  },
  {
    id: 4,
    icon: iconTrading,
    label: 'Trading Cards',
  },
  {
    id: 5,
    icon: iconVirtual,
    label: 'Virtual Worlds',
  },
  {
    id: 6,
    icon: iconDomain,
    label: 'Domain Names',
  },
  {
    id: 7,
    icon: iconMusic,
    label: 'Music',
  },
];

export const SortByOptions = [
  {
    id: 'createdAt',
    label: 'Recently Created',
  },
  {
    id: 'oldest',
    label: 'Oldest',
  },
  {
    id: 'listedAt',
    label: 'Recently Listed',
  },
  {
    id: 'soldAt',
    label: 'Recently Sold',
  },
  {
    id: 'saleEndsAt',
    label: 'Ending Soon',
  },
  {
    id: 'price',
    label: 'Highest Price',
  },
  {
    id: 'cheapest',
    label: 'Lowest Price',
  },
  {
    id: 'rarityAsc',
    label: 'Most Rare',
  },
  {
    id: 'rarityDesc',
    label: 'Least Rare',
  },
  {
    id: 'lastSalePrice',
    label: 'Highest Last Sale',
  },
  {
    id: 'viewed',
    label: 'Mostly Viewed',
  },
];

const FilterConstants = {
  UPDATE_STATUS_FILTER: 'UPDATE_STATUS_FILTER',
  UPDATE_COLLECTIONS_FILTER: 'UPDATE_COLLECTIONS_FILTER',
  UPDATE_CATEGORIES_FILTER: 'UPDATE_CATEGORIES_FILTER',
  UPDATE_GROUP_TYPE_FILTER: 'UPDATE_GROUP_TYPE_FILTER',
  UPDATE_SORT_BY_FILTER: 'UPDATE_SORT_BY_FILTER',
};

export default FilterConstants;
