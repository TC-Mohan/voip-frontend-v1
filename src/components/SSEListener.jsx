import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedMoney } from '../slices/WalletSlice';

const SSEListener = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.wallet.userId);

  useEffect(() => {
    if (!userId) return;

    const eventSource = new EventSource('/api/balance-updates');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.userId === userId) {
        dispatch(updatedMoney(data.balance));
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch, userId]);

  return null; // This component doesn't render anything
};

export default SSEListener;