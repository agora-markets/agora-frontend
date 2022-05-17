import React, { useEffect, useState, useMemo } from 'react';
import styles from '../../styles.module.scss';
import { useApi } from 'api';


export function ArtworkDetailPageAttributesView(props) {
  const { address } = props;

  const { getAttributeFilterData } = useApi();
  const [filterData, setFilterData] = useState([]);
  const [setParsedFilterData] = useState([]);
  const fetchFilterData = async () => {
    try {
      let data = await getAttributeFilterData(address);
      setFilterData(data);
    } catch (e) {
      setFilterData([]);
    }
  };

  useMemo(()=>{
    fetchFilterData();
  },[])

  useEffect(()=>{
    if (!filterData) return;
    let parsedData = [];
    filterData.map((v)=>{
      if (v.isNumeric === false)
      {
        let total_value = 0;
        v.value.map(v2=>{
          total_value +=  v2.count;
        })

        let tmp = v;
        tmp.total_value = total_value;
        parsedData.push(tmp);
      }
    });
    //console.log('parsedData',parsedData)

    // parse to array //
    let result = [];
    parsedData.map((v)=>{
      result[v._id] = v;
      v.value.map((v2)=>{
        result[v._id][v2.value] = v2;
      });
    })
    console.log('parsedData',result)
    setParsedFilterData(result);

  },[filterData])

  return <div className={styles.attributeWrapper}></div>;
}
