import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { Coin, useGetCryptosQuery } from '../../../services/cryptoApi';

interface ICurrenciesProps {
  simplified?: boolean;
}

export const Currencies: React.FC<ICurrenciesProps> = ({ simplified = false }) => {
  const count = simplified ? 10 : 100;
  const { data } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin: Coin) => coin.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [data, searchTerm]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder='Search Crypto Currency' value={searchTerm} onChange={({ target: { value } }) => setSearchTerm(value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(({ uuid, rank, name, iconUrl, price, marketCap, change }) => (
          <Col xs={24} sm={12} lg={6} key={uuid}>
            <Link to={`/crypto/${uuid}`}>
              <Card title={`${rank}. ${name}`} hoverable extra={<img height="30" alt={`${name}`} className='crypto-image' src={iconUrl} />}>
                <p>Price: {millify(Number(price))}</p>
                <p>Market Cap: {millify(Number(marketCap))}</p>
                <p>Daily Change: {millify(Number(change))}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}
