const svg = d3
  .select(".heart-container")
  .append("svg")
  .attr("class", "heart")
  .attr("viewBox", "0 0 24 24")
  .attr("fill", "red")
  .attr("xmlns", "http://www.w3.org/2000/svg");

svg
  .append("path")
  .attr(
    "d",
    "M12 21.35l-1.45-1.32C6.05 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-4.05 6.86-8.55 11.54L12 21.35z"
  );
