const n="https://gql.hashnode.com/",r="blog.saikat.in";async function i(o,e){const t=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:o,variables:e})});if(!t.ok){const a=await t.text();throw new Error(`Hashnode request failed with status ${t.status}: ${a}`)}const s=await t.json();if(s.errors?.length)throw new Error(s.errors[0].message||"Failed to fetch from Hashnode");return s.data}async function d(){return(await i(`
    query PublicationPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              slug
              title
              brief
              publishedAt
              readTimeInMinutes
              url
              tags { name }
            }
          }
        }
      }
    }
  `,{host:r,first:10})).publication?.posts.edges.map(t=>t.node)??[]}export{d as f};
