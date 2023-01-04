import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface ChartProps {
    coinId: string;
}

interface IHistory {
    time_open: number;
    time_close: number
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    const exceptData = data ?? [];
    const chartData = exceptData?.map(i => {
        return {
            x: i.time_close,
            y: [i.open, i.high, i.low, i.close],
        }
    })
    return <div>{isLoading ? "Loading chart..." :
        <ApexChart
            type="candlestick"
            series={[
                {
                    name: "price",
                    data: chartData,
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light",
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                },
                grid: {
                    show: false,
                },
                stroke: {
                    curve: "smooth",
                },
                yaxis: {
                    show: true,
                },
                xaxis: {
                    labels: {
                        show: false,
                    },
                    type:"datetime",
                    categories: data?.map((price) => 
                        new Date(price.time_close * 1000).toISOString()),
                },
                plotOptions: {
                    candlestick: {
                      colors: {
                        upward:  isDark? '#3C90EB': '#40e94b',
                        downward: isDark? '#DF7D46' : '#f0bb2a',
                        
                      }
                    }
                  },
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}`,
                    }
                }
            }}
        />
    }
    </div>
}

export default Chart;