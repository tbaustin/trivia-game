const axios = require(`axios`)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
	const api = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`
	const { createNode } = actions

	// Data can come from anywhere, but for now create it manually
	try { 
		const { data } = await axios({
			method: `get`,
			url: api,
		})
    
		if(data?.results){
			const { results } = data

			results.forEach((question, idx) => {
				const nodeContent = JSON.stringify(question)

				const nodeMeta = {
					id: createNodeId(`question-${idx}`),
					parent: null,
					children: [],
					internal: {
						type: `Questions`,
						mediaType: `text/html`,
						content: nodeContent,
						contentDigest: createContentDigest(question),
					},
				}

				const node = Object.assign({}, question, nodeMeta)
				createNode(node)
			})
		} else {
			console.log(`Questions not fetched... try again...`)
			process.exit(1)
		}

	} catch(e) {
		console.log(`Error: `, e)
		process.exit(1) // fail build since we need data for game to work
	}
}