import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from services.embedding import embeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from middleware.auth_middleware import require_role

router = APIRouter()

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    user: dict = Depends(require_role("admin"))
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    file_location = f"temp_{file.filename}"

    try:
        with open(file_location, "wb") as f:
            f.write(await file.read())

        loader = PyPDFLoader(file_location)
        docs = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100
        )

        split_docs = splitter.split_documents(docs)

        if not split_docs:
            raise HTTPException(status_code=400, detail="PDF contains no valid text content")

        db = FAISS.from_documents(split_docs, embeddings)
        db.save_local("faiss_index")

        return {"message": "PDF processed successfully", "chunks": len(split_docs)}

    finally:
        if os.path.exists(file_location):
            os.remove(file_location)