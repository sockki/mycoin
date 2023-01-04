import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

interface PriceProps {
    coinId: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    color: ${props => props.theme.detailColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 20px;
  border-radius: 10px;
  margin: 10px 0;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: PriceProps) {
    const { isLoading: pricesLoading, data: pricesData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId),
        {
            refetchInterval: 5000,
        }
    );
    return (
        <div>
            {pricesLoading ? "Loading...." :
                <Container>
                    <Overview>
                        <OverviewItem>
                            <span>price:</span>
                            <span>{pricesData?.quotes.USD.price}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>ath_date:</span>
                            <span>{pricesData?.quotes.USD.ath_date}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>ath_price:</span>
                            <span>{pricesData?.quotes.USD.ath_price}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>percent_change_by_time:</span>
                            <span>15m: {pricesData?.quotes.USD.percent_change_15m}</span>
                            <span>30m: {pricesData?.quotes.USD.percent_change_30m}</span>
                            <span>1H: {pricesData?.quotes.USD.percent_change_1h}</span>
                            <span>6H: {pricesData?.quotes.USD.percent_change_6h}</span>
                            <span>12H: {pricesData?.quotes.USD.percent_change_12h}</span>
                            <span>24H: {pricesData?.quotes.USD.percent_change_24h}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>market_cap:</span>
                            <span>{pricesData?.quotes.USD.market_cap}</span>
                        </OverviewItem>
                    </Overview>
                    <Overview>
                        <OverviewItem>
                            <span>volume_24h:</span>
                            <span>{pricesData?.quotes.USD.volume_24h}</span>
                        </OverviewItem>
                    </Overview>
                </Container>
            }
        </div>
    );
}

export default Price;