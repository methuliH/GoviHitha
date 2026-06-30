"""Pydantic output schemas for the ResourceRecommendationAgent."""
from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class ProductRecommendation(BaseModel):
    type: str  # "fungicide" | "fertilizer" | "tool" | "seed"
    product_name: str
    why: str
    availability: str
    estimated_cost: str
    application_notes: Optional[str] = None
    kapruka_search_link: str


class ResourceResult(BaseModel):
    recommendations: list[ProductRecommendation]
    priority_note: str
    error: Optional[str] = None
