const fetch = require("node-fetch");
async function run() {
  const res = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query { publication(host: "blog.saikat.in") { posts(first: 2) { edges { node { title brief publishedAt url readTimeInMinutes } } } } }`
    }),
  });
  const data = await res.text();
  console.log(res.status, data);
}
run();
