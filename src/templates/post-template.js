import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data: { markdownRemark: post } }) => (
  <Layout>
    <div>
      <h1>{post.frontmatter.title}</h1>
      <p>Time to read: {post.timeToRead} min</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      timeToRead
      html
      frontmatter {
        title
      }
    }
  }
`
