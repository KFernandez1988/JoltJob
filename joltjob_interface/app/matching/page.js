'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';

export default function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll('.card-graphic');
    cards.forEach((card) => {
      // Clear any existing content
      card.innerHTML = '';

      const compatibility = Math.floor(Math.random() * 100);
      
      const svg = d3.select(card)
        .append('svg')
        .attr('width', 200)
        .attr('height', 200)
        .append('g')
        .attr('transform', 'translate(100,100)');

      const arc = d3.arc()
        .innerRadius(60)
        .outerRadius(80)
        .startAngle(0)
        .endAngle((compatibility / 100) * 2 * Math.PI);

      const backgroundArc = d3.arc()
        .innerRadius(60)
        .outerRadius(80)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      svg.append('path')
        .attr('d', backgroundArc)
        .attr('fill', '#F1F1F1');

      svg.append('path')
        .attr('d', arc)
        .attr('fill', '#4CAF50');

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', '24px')
        .attr('fill', '#4CAF50')
        .text(`${compatibility}%`);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full flex justify-end p-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            document.getElementById('resume-form').classList.toggle('hidden');
          }}
        >
          Submit Resume
        </button>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-8">
          COMPANIES RESULTS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-2 left-2">
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Save</button>
              </div>
              <div className="card-graphic mb-4"></div>
              <div className="text-2xl font-bold mb-2">
                Compatibility: {Math.floor(Math.random() * 100)}%
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">&copy; 2024 JoltJob. All rights reserved.</p>
      </footer>

      <div id="resume-form" className="fixed top-16 right-4 bg-white shadow-md rounded-lg w-96 p-4 hidden">
        <form>
          <label className="block text-left text-gray-700 mb-2" htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            className="block w-full mb-4"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
