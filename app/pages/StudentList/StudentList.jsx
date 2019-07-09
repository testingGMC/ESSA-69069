
import React from 'react'
import { List, Avatar, Button, Skeleton, Radio, Input } from 'antd';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'
import messages from './messages'
import './student-list.scss'

import reqwest from 'reqwest';
const { Search } = Input;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const plainOptions = ['Present', 'Absent'];

class StudentList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };





  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;


    const handleSearch = (value) => {
      this.setState({
        list: this.state.list.filter(
          e =>
            e.name.last.toLowerCase().includes(value.toLowerCase())
        )
      });
    }
    const removeStudent = index => {
      const remove = [...this.state.list];
      remove.splice(index, 1);
      this.setState({ list: remove });
    };
    const addStudent = (last, email) => {
      const newStudent = [...this.state.list, {
        name: last,
        description: email
      }];
      this.setState({ list: newStudent });
    };

    return (
      <div className='student-list-container'>
        <div className='search-student'>
          <Search
            placeholder="input student name"
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <a onClick={(e) => addStudent({
            id: Math.random(),
            first: prompt('first name: ', e.target.value),
            last: prompt('last name: ', e.target.value),
            email: prompt('email: ', e.target.value)
          })}>{' '}ADD</a>
        </div>

        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[
              <a onClick={(index) => removeStudent(index)}>delete</a>
            ]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a>{item.name.last} {item.name.first} </a>}
                  description={<a> {item.email} || {item.nat}</a>}
                />
                <div>
                  <Radio.Group
                    options={plainOptions}
                    defaultValue={['Present']}
                  //onChange={onChange} 
                  />
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default StudentList