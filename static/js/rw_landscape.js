d3.json("/cleanlistings").then((data) => {
console.log(data)
});

d3.select('filterlistings').on("click", () => {
        console.log(`filtered`)
});