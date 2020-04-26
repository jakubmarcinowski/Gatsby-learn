import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const GET_SITEMETADATA = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
        createAt
      }
    }
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(GET_SITEMETADATA)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built by
          {data.site.siteMetadata.author} in {data.site.siteMetadata.createAt}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
