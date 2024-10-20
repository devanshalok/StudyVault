import {NextResponse} from "next/server";
import {error} from "next/dist/build/output/log";

export async function POST(req){
    const {input} = await req.json()
    if(!input){
        NextResponse.json({message: "No input audio to transcribe"}, {status: 500})
    }
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/openai/whisper-base', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: input, // Input data
            }),
        });
        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({error: result.error || 'Failed to process the request'}, {status: response.status});
        }

        return NextResponse.json(result, {status: 200});
    }catch(error){
            console.log(error)
            return NextResponse.json({ error: error.message }, {status: 500})
    }
}