"""Entry point for GoviHitha ADK agents."""
from agents.config.settings import settings


def main():
    print(f"GoviHitha agents loaded. Project: {settings.GOOGLE_CLOUD_PROJECT}")
    print("Run with: adk web .")


if __name__ == "__main__":
    main()
