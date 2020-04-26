import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const renderPosts = posts => {
  return posts.map(
    ({
      node: {
        id,
        fields: { slug },
        frontmatter: { title, date },
      },
    }) => {
      return (
        <li key={id}>
          <Link to={`/posts${slug}`}>{title}</Link>
          <span> Date: {date}</span>
        </li>
      )
    }
  )
}

export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <p>Total count {data.allMarkdownRemark.totalCount}</p>
      <ul>{renderPosts(posts)}</ul>
      <div>
        {!isFirstPage && (
          <Link to={prevPage} rel="prev">
            Prev Page
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && (
          <Link to={nextPage} rel="next">
            Next Page
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "MMM DD", locale: "pl")
          }
        }
      }
    }
  }
`
