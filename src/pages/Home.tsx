import { useState, useEffect } from 'react'

// import { DisplayCampaigns } from '../components';
import { TenderiumContext } from '../utils/Context'
import DisplayTenders, { ITender } from '../components/DisplayTenders.js';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tenders, setTenders] = useState<ITender[]>([]);

  const { address, contract, getTenders } = TenderiumContext();

  const fetchTenders = async () => {
    setIsLoading(true);
    let data = await getTenders();
    console.log(data);
    setIsLoading(false);

    for(const _a of data){
      
      
    }

    setTenders(data);

  }

  
  

  useEffect(() => {
    if(contract) fetchTenders();
  }, [address, contract]);

  return (
    <DisplayTenders
      title="All Tenders"
      isLoading={isLoading}
      tenders={tenders}
    />
  )
}

export default Home