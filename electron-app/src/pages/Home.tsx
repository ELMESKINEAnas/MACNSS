import React from "react";
import LoginAgent from "./LoginAgent";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center flex-col h-screen bg-cover )]">
        <h1 className="text-center text-gray-700 text-4xl font-bold mb-[5em] bg-gray-50 py-4 bg-opacity-60">
          My Cnss
        </h1>
        <div className="flex justify-center items-center">
            <LoginAgent/>
        </div>
      </div>
    </div>
  );
}
