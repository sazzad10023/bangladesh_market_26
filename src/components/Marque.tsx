import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: number;
  title: string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marque = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const data = await res.json();
  const headLine: Headlines[] = data;

  console.log(headLine);

  return (
    <div className="bg-white-800 text-black-800 py-2">
      <div className="flex  px-4">

        <MarqueeText
          className="py-1 text-[14px]"
          direction="right"
          duration={10}
        >
          {headLine.map((h) => (
            <span key={h.id}>
              <span>{h.image}</span>{" "}
              <span>{h.nameBn}</span>{" "}
              <span>{h.today}</span>{" "}
              <span>{h.unit}</span>{" "}

              <span
                className={
                  h.change.dir === "up"
                    ? "text-green-300"
                    : "text-red-300"
                }
              >
                {h.change.dir === "up" ? "▲" : "▼"}{" "}
                {h.change.pct}%
              </span>

              <span className="mx-5">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marque;