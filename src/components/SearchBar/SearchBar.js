import React, { useState } from 'react';
import _ from 'lodash';
import { fetchData } from '../../services/movies';
import ResultListComponent from '../ResultList';
import './index.css';
import { Input, Tabs } from 'antd';

const { TabPane } = Tabs;

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');

  const onChange = ({ target: { value } }) => {
    setQuery(value);

    const search = _.debounce(sendQuery, 300);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (value) {
      search(value);
    } else {
      setDataList([]);
      setErrorMssg('');
    }
  };

  /**
   * In charge to send the value
   * to the API.
   * @param {*} value
   */
  const sendQuery = async value => {
    const { cancelPrevQuery, result } = await fetchData(value);

    if (cancelPrevQuery) return;

    if (result.Response === 'True') {
      setDataList(result.Search);
      setErrorMssg('');
    } else {
      setDataList([]);
      setErrorMssg(result.Error);
    }
  };

  return (
    <div className="searchContainer">
      <div>
        <Tabs defaultActiveKey="1" className="ant-tabs-tab-active">
          <TabPane tab="Tab 1" key="1">
            <h1 className="searchHeading">Type to search!</h1>

            <Input
              className="SearchBarInput"
              type="text"
              value={query}
              placeholder="Enter Movie Title"
              onChange={onChange}
            />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <h1 className="searchHeading">Type to search!</h1>
            <Input className="SearchBarInput" type="text" placeholder="Enter Movie Title" />
          </TabPane>
        </Tabs>
      </div>
      <div>
        <ResultListComponent items={dataList} />
        {errorMssg}
      </div>
    </div>
  );
};

export default SearchBarComponent;
