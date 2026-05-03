from fastapi import APIRouter

router = APIRouter()

@router.post("/analyze")
def analyze(data: dict):
    markdown = data.get("markdown", "")

    # MVP: simple enhancement (no AI yet)
    enhanced = markdown + "\n\n## Conclusion\nThis project is well structured."

    return {
        "final_markdown": enhanced,
        "analysis": {
            "info": "basic enhancement applied"
        }
    }