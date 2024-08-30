'use client'; // This marks the component as a client component

import { useWebSocketWithSound, AlertBox } from '@/hooks/useWebSocket';

export default function WebSocketProvider() {
  const { alert, audioRef, handleAlert } = useWebSocketWithSound('ws://13.127.133.23:8000/ws/notifications/1');

  return (
    <>
      <audio ref={audioRef} src="/sound/alert.mp3" preload="auto" />
      <AlertBox open={alert.alert} info={alert.info} handleAlert={handleAlert} />
    </>
  );
}
