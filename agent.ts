
import { query } from "@anthropic-ai/claude-agent-sdk";

async function main() {

  for await (const message of query({

    prompt: `Search the web for recent academic papers (2022-2026) related to my research on perceptual judgments of AI-generated videos. 

    Focus on finding papers about:

    1. Human detection of deepfakes and AI-generated video

    2. Signal detection theory applied to media authenticity

    3. Motion artifacts in text-to-video models (Sora, Veo, Seedance)

    4. The "liar's dividend" and epistemic effects of deepfakes

    5. Confidence calibration and metacognition in deepfake detection

    6. Human vs automated deepfake detection performance comparisons

    For each paper found, extract: title, authors, year, key findings, and how it relates to my work on viewing duration effects and the asymmetry between detecting fakes vs confirming authenticity.

    

    Then write the results to a file called new_papers.md organized by topic.`,

    options: {

      allowedTools: ["Read", "Write", "Glob", "WebSearch"],

      permissionMode: "acceptEdits",

      systemPrompt: `You are an expert academic research assistant specializing in visual perception, cognitive science, and AI-generated media. 

      

      The user is a cognitive science undergraduate at UC Berkeley writing a thesis on how people judge whether videos are real or AI-generated. Their study examines how viewing duration (0s to 8s) affects detection accuracy for videos from Sora, Veo, and Seedance. Key findings include: detection of fakes improves with duration but trust in real videos does not, and people are better at detecting AI-generated humans than non-human content.

      

      When finding papers, prioritize: empirical studies with human participants, papers using signal detection theory, work on text-to-video models specifically, and papers about the societal implications of deepfakes. Always note how each paper connects to the asymmetry between fake detection and authenticity confirmation, which is the core theoretical contribution of this thesis.`

    }

  })) {

    if (message.type === "assistant" && message.message?.content) {

      for (const block of message.message.content) {

        if ("text" in block) process.stdout.write(block.text);

        else if ("name" in block) console.log(`\n[Tool: ${block.name}]`);

      }

    } else if (message.type === "result") {

      console.log(`\n✅ Done: ${message.subtype}`);

    }

  }

}

main();

