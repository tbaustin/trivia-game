import React from "react"
import { Link } from "gatsby"
import { css } from '@emotion/react'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<h1 css={styles.subheader}>Taylor Austin's Trivia Game code challenge</h1>
		<p>Using gatsby js</p>
		<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
			<Image />
		</div>
		<Link css={styles.link} to="/quiz/">Start the quiz here</Link> <br />
	</Layout>
)

const styles = {
	subheader: css`
    font-size: 1.25em;
  `,
	link: css`
    font-size: 1.25em;
  `,
}



export default IndexPage
