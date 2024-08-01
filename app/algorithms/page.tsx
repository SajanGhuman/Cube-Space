"use client";
import React, { useEffect, useState } from "react";
import { Algorithm } from "@prisma/client";

const Algorithms = () => {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        const response = await fetch("/api/algs");
        const data = await response.json();
        setAlgorithms(data);
      } catch (error) {
        console.error("Failed to fetch algorithms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="border-none relative left-[500px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-[1000px]">
      <h1 className="text-2xl font-bold text-center">Algorithms</h1>
      <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4">
        <table className="min-w-full border-collapse border-balck]">
          <thead>
            <tr>
              <th className="border border-gray-200 bg-gray-100 bg-opacity-60 px-4 py-2 text-left text-sm font-medium text-gray-900">
                Name
              </th>
              <th className="border border-gray-200 bg-gray-100 bg-opacity-60 px-4 py-2 text-left text-sm font-medium text-gray-900">
                Notation
              </th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algorithm) => (
              <tr key={algorithm.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {algorithm.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {algorithm.notation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Algorithms;
