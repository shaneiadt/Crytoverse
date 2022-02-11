import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ILinkChartProps {
    coinHistory: {
        change: string;
        history: { price: string; timestamp: number }[]
    };
    currentPrice: string;
    coinName: string;
}

export const LinkChart: React.FC<ILinkChartProps> = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < coinHistory.history.length; i++) {
        coinPrice.push(coinHistory.history[i].price);
        coinTimeStamp.push(new Date(coinHistory.history[i].timestamp).toLocaleDateString());
    }

    const options = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    const data = {
        labels: coinTimeStamp,
        datasets: [{
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
        }]
    }

    return (
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className='chart-title'>{coinName} Price Chart</Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className='price-change'>{coinHistory.change}%</Typography.Title>
                    <Typography.Title level={5} className='current-price'>Current {coinName} ${currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}
