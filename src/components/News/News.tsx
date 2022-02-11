import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Spin, Space } from 'antd';
import moment from 'moment';
import { unitOfTime } from 'moment';

import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

let period: string;

interface INewsProps {
  simplified?: boolean;
}

export const News: React.FC<INewsProps> = ({ simplified = false }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count = simplified ? 6 : 12;
  const { data } = useGetCryptoNewsQuery({ newsCategory, count });
  const { data: coins } = useGetCryptosQuery(100);

  if (!data?.value) return <Spin />

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(inputValue, option) => {
              if (option) {
                const { value } = option;
                if (value) {
                  return value?.toString().toLocaleLowerCase().includes(inputValue.toLocaleLowerCase());
                }
              }

              return true;
            }}
          >
            <Option value="Crytocurrency">Crytocurrency</Option>
            {coins?.data.coins.map(({ name }) => (
              <Option key={name} value={name}>{name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {data.value.map(({ url, name, description, datePublished, provider, image }, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>{name}</Title>
                <img src={image?.thumbnail?.contentUrl || demoImage} alt='news' />
              </div>
              <p>
                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                  <Text className='provider-name'>{provider[0]?.name}</Text>
                </div>
                <Space>
                  <Text>{moment(datePublished).startOf(period as unitOfTime.StartOf).fromNow()}</Text>
                </Space>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
