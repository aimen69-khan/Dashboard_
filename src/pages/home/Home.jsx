import React from "react";
import StatCards from "../../components/statcards/Statcards";
import DealsTable from "../../components/dealstable/Dealstable";  
import SalesChart from "../../components/saleschart/Saleschart";

export default function Home() {
  return (
    <>
      <StatCards />
      <SalesChart />
      <DealsTable />
    </>
  );
}