import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Error getting single prompt', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt)
      return new Response('The prompt does not exist', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response('The prompt have been updated', { status: 200 })
  } catch (error) {
    return new Response('There was an error updating the prompt', {
      status: 500,
    })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)
    return new Response('The prompt was deleted', { status: 200 })
  } catch (error) {
    return new Response('An error occurred deleting prompt', { status: 500 })
  }
}
