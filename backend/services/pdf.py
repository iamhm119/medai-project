from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import tempfile
import os

def process_pdf(file_bytes):
    # Save temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        file_path = tmp.name

    # Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # Embeddings
    embeddings = HuggingFaceEmbeddings()

    # Create vector DB
    db = FAISS.from_documents(documents, embeddings)

    # Save index
    db.save_local("faiss_index")

    # Clean temp file
    os.remove(file_path)