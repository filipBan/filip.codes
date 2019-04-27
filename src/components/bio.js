import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
            {/* <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              critical
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: 70,
                minWidth: 70,
                height: 70,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            /> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                Hi, my name is <strong>{author}</strong>, I live in Edinburgh
                and I like to build things.
              </span>
              <span>
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Say hi on Twitter.
                </a>
              </span>
              <span>
                <a
                  href={`https://github.com/filipBan`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  I'm on Github.
                </a>
              </span>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
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
