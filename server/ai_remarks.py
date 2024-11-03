from sentence_transformers import CrossEncoder
import torch
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the sentence similarity model
similarity_model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2", default_activation_function=torch.nn.Sigmoid())

# Get the Groq API key from environment variables
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)

# Function to get AI remarks and similarity score
def get_ai_remarks(answer_key: str, answer: str):
    # Check if both parameters are provided
    if not answer_key or not answer:
        return {'error': 'Both answer_key and answer are required'}

    try:
        # Calculate similarity score
        similarity_score = similarity_model.predict([(answer_key, answer)])[0] * 100

        # Generate AI remarks
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an AI assistant providing feedback."},
                {"role": "user", "content": f"Provide remarks on the comparison of these two sentences: '{answer_key}' and '{answer}'. The similarity score between them is {similarity_score:.2f}%. Provide feedback as if grading a student's answer, with sentence 1 as the answer key and sentence 2 as the student's response."}
            ],
            model="llama3-8b-8192"
        )

        ai_remarks = chat_completion.choices[0].message.content

        return {
            'similarity_score': f"{similarity_score:.2f}",
            'ai_remarks': ai_remarks
        }

    except Exception as e:
        print(f"Error during Groq API call: {str(e)}")
        return {'error': 'Something went wrong with the Groq API request'}
