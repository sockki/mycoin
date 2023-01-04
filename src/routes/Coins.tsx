
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { fetchCoins } from "./api";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    border-radius:  15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        padding: 20px;
    }
    &:hover {
        color:${props => props.theme.accentColor}
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    font-size: 30px;
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
const TogBtn = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    background: none;
    margin: 0;
    padding: 0.5rem 1rem;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color:${props => props.theme.accentColor};
    &:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    }
`;



interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}



function Coins() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const responese = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await responese.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])
    */
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <TogBtn onClick={toggleDarkAtom}>Toggle Mode</TogBtn>
            </Header>
            {isLoading ?
                <Loader>Loading...</Loader> :
                <CoinsList>
                    {data?.slice(0, 100).map(coin =>
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: { name: coin.name }
                            }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>)
                    }

                </CoinsList>}
        </Container>
    );
}

export default Coins

