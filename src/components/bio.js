import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                Hi, my name is <strong>{author}</strong>, I live in Edinburgh
                and I like to build things.
              </span>
              <div>
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    fixed={data.twitterLogo.childImageSharp.fixed}
                    alt="twitter"
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      width: 30,
                      minWidth: 30,
                      height: 30,
                      borderRadius: `100%`,
                    }}
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                </a>
                <a
                  href={`https://github.com/filipBan`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    fixed={data.githubLogo.childImageSharp.fixed}
                    alt="github"
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      width: 30,
                      minWidth: 30,
                      height: 30,
                      borderRadius: `100%`,
                    }}
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                </a>
                <a
                  href={`https://codesandbox.io/u/filipBan`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    fixed={data.codesandboxLogo.childImageSharp.fluid}
                    alt="codesandbox"
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      width: 27,
                      minWidth: 27,
                      height: 30,
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    twitterLogo: file(absolutePath: { regex: "/twitter-logo.png/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    githubLogo: file(absolutePath: { regex: "/github-logo.png/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    codesandboxLogo: file(absolutePath: { regex: "/codesandbox-logo.png/" }) {
      childImageSharp {
        fluid(maxWidth: 30) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
