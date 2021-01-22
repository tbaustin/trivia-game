import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { css } from '@emotion/react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import QuizCard from '../components/quiz-card'

export default function QuizPage(props) {
	const { data } = props
	const [inProgress, setInProgress] = useState(false)
  
	const questions = data?.allQuestions?.nodes

	return (
		<Layout>
			<SEO title="Quiz" />
			<Link to="/">Back to Home</Link>
			<h1>Welcome to the Trivia Challenge!</h1>
			<p>You will be presented with 10 True of False Questions</p>
			<p>Can you score 100%?</p>
			<button 
				css={styles.button} 
				onClick={() => setInProgress(!inProgress)}
			>
				{inProgress ? `Cancel Quiz`: `Begin Quiz`}
			</button>
			{inProgress && <QuizCard questions={questions} />}
		</Layout>
	)
}

const styles = {
	button: css`
    color: white;
    background: salmon;
    :hover {
      color: #ccc;
    }
  `,
}

export const query = graphql`
  query QuizPageQuery {
    allQuestions {
      nodes {
        category
        difficulty
        question
        correct_answer
        incorrect_answers
      }
    }
  }
`
