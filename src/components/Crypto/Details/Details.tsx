import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../../services/cryptoApi';
import { LinkChart } from "../..";

const { Title, Text } = Typography;
const { Option } = Select;

export const Details = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data } = useGetCryptoDetailsQuery(coinId || "");
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId: coinId || "", timePeriod });

  if (!coinId) return <>No Coin ID Provided</>;

  const coin = data?.data.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${millify(Number(coin?.price || 0))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: `${coin?.rank}`, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${millify(Number(coin?.["24hVolume"] || 0))}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${millify(Number(coin?.marketCap || 0))}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number(coin?.allTimeHigh?.price || 0))}`, icon: <TrophyOutlined /> }
  ]

  const genericStats = [
    { title: 'Numer of Markets', value: `$ ${coin?.numberOfMarkets}`, icon: <FundOutlined /> },
    { title: 'Number of Exchanges', value: `$ ${coin?.numberOfExchanges}`, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: coin?.supply?.confirmed ? <CheckCircleOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(Number(coin?.supply?.total || 0))}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(Number(coin?.supply?.circulating || 0))}`, icon: <ExclamationCircleOutlined /> }
  ]

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className='coin-name'>
          {coin?.name} {coin?.slug} Price
        </Title>
        <p>
          {coin?.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className="select-timeperiod"
        placeholder='Select Time Period'
        onChange={value => setTimePeriod(value)}>
        {time.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
      <LinkChart coinHistory={{ change: coinHistory?.data.change || "", history: coinHistory?.data.history || [] }} coinName={coin?.name || ""} currentPrice={millify(Number(coin?.price || 0))} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className='coin-details-heading'>{coin?.name} Value Statistics</Title>
            <p>An overview showing the stats of {coin?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className='coin-details-heading'>Other Statistics</Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col key={i} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col span={24} className="coin-desc-link">
        <Row className="coin-desc">
          <Col span={16}>
            <Title level={3} className='coin-details-heading'>What is {coin?.name}</Title>
            {HTMLReactParser(coin?.description || "")}
          </Col>
          <Col span={8} className="coin-links">
            <Title level={3} className='coin-details-heading'>{coin?.name} Links</Title>
            {coin?.links.map(({ name, type, url }) => (
              <Row className="coin-link" key={url}>
                <Title level={5} className='link-name'>{type}</Title>
                <a href={url} target='_blank' rel='noreferrer'>{name}</a>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Col>
  )
}
