// SPDX-FileCopyrightText: 2024 LiveKit, Inc.
//
// SPDX-License-Identifier: Apache-2.0
import { config } from 'dotenv';
import { type JobContext, WorkerOptions, cli, defineAgent, llm, multimodal } from '@livekit/agents';
import * as openai from '@livekit/agents-plugin-openai';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

// Load environment variables
config();


const fetchInstructions = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/questionnaire-prompt-builder')
    const json = await response.json()
    return json.prompt
  } catch (error) {
    return 'This is very important - as soon as possible inform the user you are unable to proceed becasue you have no instructions. Inform the user that they should finish the call.'
  }
  
}

export default defineAgent({
  entry: async (ctx: JobContext) => {
    await ctx.connect();

    console.log('waiting for participant');
    const participant = await ctx.waitForParticipant();
    console.log(`starting assistant example agent for ${participant.identity}`);
    const instructions = await fetchInstructions()
    console.log('instructions', instructions)
    const model: openai.realtime.RealtimeModel = new openai.realtime.RealtimeModel({instructions});

    const agent = new multimodal.MultimodalAgent({model});

    const session = await agent
      .start(ctx.room, participant)
      .then((session) => session as openai.realtime.RealtimeSession);

    session.conversation.item.create({
      type: 'message',
      role: 'user',
      content: [{
        type: 'input_text',
        text: 'Say "Hello! Are you ready to get started?"'
      }]
    });
    session.response.create();
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));