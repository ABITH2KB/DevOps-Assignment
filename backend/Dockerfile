# ---------- Build stage ----------
FROM python:3.10-slim AS builder

WORKDIR /app

# Install build deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install python deps
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install -r requirements.txt

# ---------- Runtime stage ----------
FROM python:3.10-slim

# Create non-root user
RUN useradd -m appuser

WORKDIR /app

# Copy installed deps from builder
COPY --from=builder /install /usr/local

# Copy app code
COPY app ./app

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV APP_ENV=production

# Switch to non-root user
USER appuser

EXPOSE 8000

# Start FastAPI with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
