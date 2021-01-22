import React from 'react'
import { css } from '@emotion/react'

import HTMLParse from './htmlParse'

export default function Results(props) {
	const { results } = props
	const correctAmount = results?.filter?.(({ correct }) => !!(correct))?.length

	return (
		<div css={styles}>
			<div className="score">Score: { ((correctAmount / results.length) * 100).toFixed(0) }%</div>
			<p>Green "Answer Given" indicates a correct answer, red indicates a wrong answer given</p>
			<ul className={`results`}>
				{results.map(result => {
					return (
						<li className={`result`} key={result.idx}>
							<h2 className="questionNum">Question #: {result.idx + 1}</h2>
							<div className="question"><div className={`key`}>Question:</div> <HTMLParse value={result.question} /></div>
							<div 
								className={`answerGiven lowerCase ${result.correct ? `green` : `red`}`}
							>
								<div className={`key`}>Answer Given:</div> {result.answer}
							</div>
							<div className="correctAnswer lowerCase"><div className={`key`}>Correct Answer:</div> {result.correct_answer}</div>
							<div className="wrongAnswer lowerCase">
								<div className="key">Wrong Answers: </div>
								<ul className="wrongAnswers">
									{result?.incorrect_answers?.map?.((ans, i) => <li key={i}>{ans}</li>)}
								</ul>
							</div>
              
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const styles = css`
  text-align: center;
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .score {
    font-size: 1.25em;
    margin: 0 0 40px 0;
  }
  .key {
    font-size: 1.05em;
    font-weight: bold;
    text-transform: capitalize;
  }
  .lowerCase {
    text-transform: lowercase;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .results {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: -10px;
    .result {
      flex-basis: 100%;
      margin: 10px;
      font-size: 16px;
      @media(min-width: 600px) {
        flex-basis: calc(100% / 2 - 20px);
      }
      @media(min-width: 1024px) {
        flex-basis: calc(100% / 3 - 20px);
      }
    }
  }
  .questionNum {
    font-size: 22px;
  }
`