import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Link } from 'react-router-dom';
import { Currencies, News } from '..';

const { Title } = Typography;

export const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return (
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin size='large' />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(Number(globalStats?.totalExchanges))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(Number(globalStats?.totalMarketCap))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(Number(globalStats?.total24hVolume))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(Number(globalStats?.totalMarkets))} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Currencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified />
    </>
  )
}
