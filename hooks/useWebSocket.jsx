'use client'; // Add this to ensure the hook is client-side

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const useWebSocketWithSound = (url) => {
  const websocketRef = useRef(null);
  const [alert, setAlert] = useState({ alert: false, info: null });
  const audioRef = useRef(null);

  const handleAlert = () => setAlert({ alert: false, info: null });

  useEffect(() => {
    if (!websocketRef.current) {
      websocketRef.current = new WebSocket(url);

      websocketRef.current.onopen = function () {
        console.log('Connection established');
      };

      websocketRef.current.onmessage = function (event) {
        if (audioRef.current) {
          const info = JSON.parse(event.data);
          setAlert({ alert: true, info: info });
          audioRef.current.play();
        }
      };

      websocketRef.current.onclose = function (event) {
        if (event.wasClean) {
          console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
          console.log('Connection died');
        }
      };

      websocketRef.current.onerror = function (error) {
        console.log(`[WebSocket Error] ${error.message}`);
      };
    }

    // Cleanup when component unmounts or WebSocket connection closes
    // return () => {
    //   if (websocketRef.current) {
    //     websocketRef.current.close();
    //     websocketRef.current = null;
    //   }
    // };
  }, [url]);

  return { alert, handleAlert, audioRef };
};

export const AlertBox = ({ open = false, info = null, handleAlert }) => {

    return (
        <Dialog open={open}>

            <DialogContent className="w-[300px]">

                <DialogHeader>
                    <DialogTitle>
                      <div className='flex gap-3 items-center'>
                        ALERT <Info />
                      </div>
                    </DialogTitle>
                </DialogHeader>

                <div>
                  {info !== null && 
                    <div>
                      <div>Enq No.: {info.enq_no}</div>
                      <div>Message: {info.description}</div>
                    </div>
                  }
                </div>

                <DialogFooter>
                  <Button type='button' onClick={handleAlert}>OK</Button>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    )

}