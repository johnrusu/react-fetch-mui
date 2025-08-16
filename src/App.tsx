import { useState } from 'react';
import { Container, Drawer, Stack } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';

// store
import { setHistory, resetHistory } from './store/appSlice';

// components
import ContainerLayout from './ContainerLayout';
import ButtonLayout from './ButtonLayout';
import Image from './Image';

// const API_URL = "https://dog.ceo/api/breeds/image/random/20"; // Moved from constants.ts
import { API_URL } from './constants'; // Importing from constants.ts
// utils.ts is not needed here as we are using the utility function directly in ContainerLayout
import { isArrayNotEmpty } from './utils'; // Importing utility function

// Importing button texts from constants.ts
import { BUTTON_TEXTS } from './constants'; // Importing button texts from constants.ts

// types
import { TInitialState } from './types/types';

function App() {
  // redux
  const dispatch = useDispatch();
  const appHistory = useSelector(
    (state: { app: TInitialState }) => state.app.history,
  );

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerFocus, setTriggerFocus] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    if (isArrayNotEmpty(data)) {
      const filtered = data.filter((item) => item.includes(query));
      setFilteredData(filtered);
    }
  };

  const handleHistoryClick = () => {
    setOpenDrawer(true);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const onClickHistoryItem = (item: string) => {
    dispatch(setHistory(item)); // Dispatching action to set history in Redux store
  };

  const resetData = () => {
    setData([]);
    setFilteredData([]);
    setLoading(false);
    dispatch(resetHistory('')); // Resetting history in Redux store
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        setLoading(false);
        setTriggerFocus(false);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data) {
        setTimeout(() => {
          setData(data.message);
          setFilteredData(data.message);
          setLoading(false);
          setTriggerFocus(true);
        }, 1000); // Simulating a delay
      }
    } catch (error) {
      setLoading(false);
      setTriggerFocus(false);
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='App relative'>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {isArrayNotEmpty(appHistory) && (
          <Stack spacing={1} className='p-5'>
            {appHistory.map((item, index) => (
              <Image
                src={item}
                key={index}
                onClickHistoryItem={() => {
                  window.open(item, '_blank');
                }}
                className='cursor-pointer hover:opacity-80 transition-opacity duration-300 w-[200px]'
              />
            ))}
          </Stack>
        )}
      </Drawer>
      <h1 className='text-2xl font-bold text-center my-4'>
        {BUTTON_TEXTS.TITLE}
      </h1>
      <Container>
        <ButtonLayout
          handleClick={handleClick}
          handleHistoryClick={handleHistoryClick}
          resetData={resetData}
          loading={loading}
          className='sticky top-0 z-10 bg-white py-4'
        />
        {isArrayNotEmpty(data) && (
          <div className='mt-6'>
            <ContainerLayout
              filteredData={filteredData}
              triggerFocus={triggerFocus}
              loading={loading}
              handleSearch={handleSearch}
              className='image-container mt-2'
              onClickHistoryItem={onClickHistoryItem}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
