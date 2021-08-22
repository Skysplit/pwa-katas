import QrScanner from "qr-scanner";
import { useCallback, useEffect, useRef, useState } from "react";

export function QrCodeScanner() {
  const [isRecording, setIsRecording] = useState(false);
  const [decoded, setDecoded] = useState<string | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const scanner = useRef<QrScanner | null>(null);

  const handleStart = useCallback(() => {
    scanner
      .current!.start()
      .then(() => {
        setIsRecording(true);
        setDecoded(null);
      })
      .catch(() => setIsRecording(false));
  }, []);

  const handleStop = useCallback(() => {
    scanner.current!.stop();
    setIsRecording(false);
  }, []);

  useEffect(() => {
    if (ref.current === null) {
      return () => {};
    }

    const qr = new QrScanner(ref.current, (result) => {
      setDecoded(result);
      handleStop();
    });

    scanner.current = qr;

    return () => scanner.current?.destroy();
  }, [handleStop]);

  return (
    <div>
      <p>
        <button onClick={handleStart}>Start recording</button>
        <button onClick={handleStop}>Stop recording</button>
      </p>
      <video
        width={isRecording ? 400 : 0}
        height={isRecording ? 300 : 0}
        ref={ref}
      ></video>
      {decoded && (
        <p>
          <strong>Decoded string</strong>
          <textarea style={{ display: "block" }} readOnly value={decoded} />
          <button onClick={() => setDecoded(null)}>Clear</button>
        </p>
      )}
    </div>
  );
}
