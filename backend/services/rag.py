from services.embedding import get_embeddings
from langchain_community.vectorstores import FAISS
from groq import Groq
from config import GROQ_API_KEY

# 🔹 Groq client
client = Groq(api_key=GROQ_API_KEY)


# 🔹 Load Vector DB
def load_db():
    try:
        db = FAISS.load_local(
            "faiss_index",
            get_embeddings(),
            allow_dangerous_deserialization=True
        )
        return db
    except:
        return None


# 🔹 Main RAG Function
def get_response(query, role):
    db = load_db()

    # ❌ No PDF uploaded
    if db is None:
        return {
            "answer": "No documents uploaded yet. Please upload a PDF first.",
            "sources": []
        }

    # 🔍 Retrieve relevant chunks
    results = db.similarity_search(query, k=5)

    # 🔐 Role-based filtering (advanced)
    if role == "user":
        results = results[:2]
    elif role == "doctor":
        results = results[:4]
    elif role == "admin":
        results = results[:5]

    # 🧠 Build context
    context = "\n\n".join([doc.page_content for doc in results])

    # Medical AI Prompt
    prompt = f"""
You are MedAI, an expert medical AI assistant.

STRICT RULES:
- Answer ONLY using the given medical context/documents
- Do NOT make assumptions or provide medical advice beyond the documents
- Extract EXACT details from the uploaded medical documents
- Keep answers clear, relevant, and structured
- If information is not found, say: "Not mentioned in the uploaded documents"
- Always remind users to consult healthcare professionals for medical decisions

---------------------
CONTEXT:
{context}
---------------------

QUESTION:
{query}

FORMAT YOUR ANSWER:

1. Direct Answer:
(Clear, specific response based on documents)

2. Key Details:
- Relevant bullet points from documents

3. Important Note:
(Remind to consult healthcare professionals if applicable)
"""

    # 🤖 LLM call
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )

    # 🔥 Clean output
    answer = response.choices[0].message.content.strip()

    return {
        "answer": answer,
        "sources": [doc.page_content for doc in results]
    }