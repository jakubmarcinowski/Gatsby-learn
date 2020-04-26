import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

export default ({ data: { allContentfulProduct } }) => {
  return (
    <Layout>
      <div>
        {allContentfulProduct.edges.map(({ node: product }) => (
          <div key={product.id}>
            <h2>Garb Product</h2>
            <Link to={`products/${product.slug}`}>
              <h3>{product.name}</h3>
            </Link>
            <Img fluid={product.image.fluid} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          name
          slug
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
