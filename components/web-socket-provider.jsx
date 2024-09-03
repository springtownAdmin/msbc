'use client'; // This marks the component as a client component

import useStorage from '@/hooks/useStorage';
import { useWebSocketWithSound, AlertBox } from '@/hooks/useWebSocket';

export default function WebSocketProvider() {

  const { getItem } = useStorage();

  const userId = getItem('user_id');
  const company_name = getItem('company_name');

  let socket_url = `ws://13.127.133.23:8000/ws/notifications`

  if (userId !== null || company_name !== null) {
    socket_url += `/${company_name}/${userId}`
  }

  const { alert, audioRef, handleAlert } = useWebSocketWithSound(socket_url);

  return (
    <>
      <audio ref={audioRef} src="/sound/alert.mp3" preload="auto" />
      <AlertBox open={alert.alert} info={alert.info} handleAlert={handleAlert} />
    </>
  );

}
