'use client'; // This marks the component as a client component

import useStorage from '@/hooks/useStorage';
import { useWebSocketWithSound, AlertBox } from '@/hooks/useWebSocket';

export default function WebSocketProvider() {
  const {getItem} = useStorage();
  const { alert, audioRef, handleAlert } = useWebSocketWithSound(`ws://13.127.133.23:8000/ws/notifications/${getItem('company_name')}/${getItem('user_id')}`);

  return (
    <>
      <audio ref={audioRef} src="/sound/alert.mp3" preload="auto" />
      <AlertBox open={alert.alert} info={alert.info} handleAlert={handleAlert} />
    </>
  );
}
