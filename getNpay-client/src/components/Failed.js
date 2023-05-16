import React from "react";

const Failed = () => {
  return (
    <div className="flex items-center justify-center p-4 h-screen">
      <div className="p-4 rounded shadow-lg ring ring-red-600/50">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="3 3 16 16"
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="-2.623"
                x2="0"
                y1="986.67"
              >
                <stop stop-color="#ffce3b" />
                <stop offset="1" stop-color="#ffd762" />
              </linearGradient>
              <linearGradient
                id="0"
                gradientUnits="userSpaceOnUse"
                y1="986.67"
                x2="0"
                y2="-2.623"
              >
                <stop stop-color="#ffce3b" />
                <stop offset="1" stop-color="#fef4ab" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                x2="1"
                x1="0"
                xlinkHref="#0"
              />
            </defs>
            <g transform="matrix(2 0 0 2-11-2071.72)">
              <path
                transform="translate(7 1037.36)"
                d="m4 0c-2.216 0-4 1.784-4 4 0 2.216 1.784 4 4 4 2.216 0 4-1.784 4-4 0-2.216-1.784-4-4-4"
                fill="#da4453"
              />
              <path
                d="m11.906 1041.46l.99-.99c.063-.062.094-.139.094-.229 0-.09-.031-.166-.094-.229l-.458-.458c-.063-.062-.139-.094-.229-.094-.09 0-.166.031-.229.094l-.99.99-.99-.99c-.063-.062-.139-.094-.229-.094-.09 0-.166.031-.229.094l-.458.458c-.063.063-.094.139-.094.229 0 .09.031.166.094.229l.99.99-.99.99c-.063.062-.094.139-.094.229 0 .09.031.166.094.229l.458.458c.063.063.139.094.229.094.09 0 .166-.031.229-.094l.99-.99.99.99c.063.063.139.094.229.094.09 0 .166-.031.229-.094l.458-.458c.063-.062.094-.139.094-.229 0-.09-.031-.166-.094-.229l-.99-.99"
                fill="#fff"
              />
            </g>
          </svg>
          <h1 className="text-2xl font-bold">Transaction failed</h1>
          <p>There's an error</p>
          <a
            className="inline-flex items-center px-4 py-2 text-white bg-red-600 border border-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring"
            href="/cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-sm font-medium">back</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Failed;
