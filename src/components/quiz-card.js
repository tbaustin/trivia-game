import React, { useState } from 'react'
import { css } from '@emotion/react'

import Results from './results'
import HTMLParse from './htmlParse'

export default function QuizCard(props) {
	const { questions } = props
	const [activeIdx, setIdx] = useState(0)
	const [answers, setAnswers] = useState([])
	const [done, setDone] = useState(false)

	const curQues = questions[activeIdx]
	const { 
		category,
		difficulty,
		question,
		correct_answer,
		incorrect_answers,
	} = curQues || {}
  
	const selectAnswer = (answer) => {
		setAnswers([
			...answers, 
			{
				idx: activeIdx,
				question: question,
				answer,
				correct: answer === correct_answer.toLowerCase(),
				correct_answer,
				incorrect_answers,
			},
		])
    
		if(activeIdx + 1 === questions.length) {
			setDone(true)
		} else {
			setIdx(activeIdx + 1)
		}
	}
  
	const restart = () => {
		setDone(false)
		setIdx(0)
		setAnswers([])
	}
  
	return (
		<div css={styles}>
			{done 
				? (
					<div className={`done`}>
						<Results results={answers} />
						<button onClick={() => restart()} className="restart">Play Again?</button>
					</div>
				)
				: (
					<>
						<h1 className={`category`}>{category}</h1>
						<div className={`difficulty light`}>Difficulty level: {difficulty}</div>
						<HTMLParse 
							className={`question`}
							value={question} 
						/>
						<div className="answers">
							<button onClick={() => selectAnswer(`true`)}>True</button>
							<button className={`red`} onClick={() => selectAnswer(`false`)}>False</button>
						</div>
						<div className={`curIdx light`}>{activeIdx + 1} out of {questions.length}</div>
					</>
				)
			}
		</div>
	)
}

const styles = css`
  margin: 50px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .done {
    text-align: center;
    button {
      margin: 20px 0;
    }
  }
  .restart {
    background: #3b9dff;
    color: #fff;
  }
  .light {
    font-size: 16px;
    color: #666;
    margin: 5px 0;
  }

  .category {
    font-size: 1.15em;
    margin: 10px 0;
  }
  .question {
    margin: 20px 0;
    p {
      margin: 0;
    }
  }
  .answers {
    margin-bottom: 15px;
    .red {
      background: #8b0000;
    }
    button {
      color: #fff;
      background: #013220;
      margin-right: 10px;   
      :hover {
        color: #ccc;
      }   
    }
  }
`