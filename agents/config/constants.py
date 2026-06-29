"""Static constants: Sri Lankan region coordinates and crop lists."""

# All 13 districts listed in frontend/src/lib/constants.ts
# Coordinates: (latitude, longitude)
REGION_COORDINATES: dict[str, tuple[float, float]] = {
    "Colombo":      (6.9271,  79.8612),
    "Kandy":        (7.2906,  80.6337),
    "Galle":        (6.0535,  80.2210),
    "Matara":       (5.9549,  80.5550),
    "Jaffna":       (9.6615,  80.0255),
    "Trincomalee":  (8.5874,  81.2152),
    "Batticaloa":   (7.7170,  81.6924),
    "Anuradhapura": (8.3114,  80.4037),
    "Polonnaruwa":  (7.9403,  81.0188),
    "Kurunegala":   (7.4818,  80.3609),
    "Ratnapura":    (6.6828,  80.3992),
    "Badulla":      (6.9934,  81.0550),
    "Nuwara Eliya": (6.9497,  80.7891),
}

# Fallback centre of Sri Lanka when region is unknown
DEFAULT_COORDINATES: tuple[float, float] = (7.8731, 80.7718)

CROP_TYPES: list[str] = [
    "rice", "corn", "tea", "coconut", "banana",
    "cassava", "pepper", "chilli", "tomato", "potato",
]
