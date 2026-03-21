from langchain_huggingface import HuggingFaceEmbeddings

_embeddings = None

def get_embeddings():
    """Lazy load embeddings - only load when first used"""
    global _embeddings
    if _embeddings is None:
        _embeddings = HuggingFaceEmbeddings()
    return _embeddings
