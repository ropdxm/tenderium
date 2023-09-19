import { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useStorageUpload } from '@thirdweb-dev/react';

import { ITender } from '../components/DisplayTenders';

export const AHAHAContext = createContext<any>(null);

export const StateContextProvider = ({ children }: {children: React.ReactNode}) => {
  const { contract } = useContract('0x8A079C7Af87Ca05693B77855795F1Fe6934ca6A4');
  const { mutateAsync: createTender } = useContractWrite(contract, 'createTender');
  const { mutateAsync: completeTenderrr } = useContractWrite(contract, 'completeTender');
  const { mutateAsync: upload } = useStorageUpload();

  const address = useAddress();
  const connect = useMetamask();

  const uploadPhoto = async (acceptedPhoto: File) => {

    const uris = await upload({data: [acceptedPhoto]});
    console.log(uris);

    return uris[0];
  }

  const publishTender = async (form: ITender) => {

    try {
      const data = await createTender({
        args: [
          form.to,
          form.title,
          form.description,
          form.image,
          form.amount,
          form.deadline,
        ],
      });
  
      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.log("contract call failure", error)
      return -1;
    }
  }

  const getTender = async (_id: number) => {
    if(!contract){
      console.error("Contract is undefined (getTender)");
      return;
    }
    const _tender = await contract.call('getTender', [_id]);
    
    return _tender;
  }

  const getTenders = async () => {
    if(!contract){
      console.log("Contract is undefined (getTenders)");
      return;
    }
    const tenders = await contract.call("getTenders");

    return tenders;
  }

  const completeTender = async (pId: number) => {
    try {

      const _data = completeTenderrr({
        args: [pId]
      });
      console.log("Contract call success", _data);
      return _data;

    } catch (e) {
      console.log("Contract call fail", e)
    }
    
    const _data = completeTenderrr({
      args: [pId]
    });
    return _data;
  }

  const getUserTenders = async () => {
    if(!contract){
      console.log("Contract is undefined (getTenders)");
      return;
    }
    const tenders = await contract.call("getTenders");
    // requires logic here
    return tenders;

  }

  return (
    <AHAHAContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createTender: publishTender,
        getTender,
        getTenders,
        completeTender,
        getUserTenders,
        uploadPhoto
      }}
    >
      {children}
    </AHAHAContext.Provider>
  )
}

export const TenderiumContext = () => useContext(AHAHAContext);