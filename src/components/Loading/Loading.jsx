import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <>
      {/* Large Device */}
      <div
        className="rounded"
        style={{
          position: "fixed",
          height: "100vh",
          top: 0,
          width: "100%",
          backgroundColor: "#ffffff",
          zIndex: "9999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src="https://lottie.host/7bb80453-b91f-4951-ad0c-d4fe1255a6a5/BCbb0X3K5c.json"
          style={{
            width: "45%",
          }}
        ></Player>
      </div>
    </>
  );
};
export default Loading;
