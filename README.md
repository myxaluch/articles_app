# Articles App

A small web application for creating articles, adding comments, and viewing engagement stats.

## Tech Stack

- **Backend:** Ruby 4, Roda, Sequel, SQLite
- **Frontend:** Angular 21, Bootstrap 5
- **Infrastructure:** Docker Compose, nginx reverse proxy

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application

```bash
git clone <repo-url>
cd elearnio
docker compose up --build
```

Wait for both containers to start, then open:

**http://localhost:4200**

To stop:

```bash
docker compose down
```

To reset the database (removes all data):

```bash
docker compose down -v
docker compose up --build
```

## Project Structure

```
elearnio/
├── backend/                    # Ruby API (Roda + Sequel + SQLite)
│   ├── app.rb                  # Routes and request handling
│   ├── config.rb               # Database connection
│   ├── config.ru               # Rack entry point
│   ├── models/                 # Sequel models (Article, Comment)
│   ├── db/migrations/          # Database schema migrations
│   ├── puma.rb                 # Web server configuration
│   └── Dockerfile
├── frontend/                   # Angular SPA + Bootstrap
│   ├── src/app/
│   │   ├── components/         # Page components (list, detail, engagement)
│   │   ├── services/           # HTTP API client
│   │   └── models/             # TypeScript interfaces
│   ├── nginx.conf              # Serves static files + proxies API
│   └── Dockerfile              # Multi-stage: Node build → nginx serve
├── docker-compose.yml
└── README.md
```

## Architecture

```
Browser (localhost:4200)
    │
    ├── Static files (HTML/CSS/JS) ──→ nginx (frontend container)
    │
    └── /api/v1/* requests ──→ nginx proxy ──→ Roda API (backend container)
                                                    │
                                                    └──→ SQLite database
```

## API Endpoints

| Method | Path                          | Description                          |
|--------|-------------------------------|--------------------------------------|
| GET    | /api/v1/articles              | List all articles (with comment count) |
| POST   | /api/v1/articles              | Create an article                    |
| GET    | /api/v1/articles/:id          | Get article with comments            |
| GET    | /api/v1/articles/:id/comments | List comments for article            |
| POST   | /api/v1/articles/:id/comments | Add comment to article               |
| GET    | /api/v1/engagement            | Engagement stats + top 5 articles    |

## Estimated Time Spent

~4 hours.
1 hour for backend/docker part and most of the time I'm investigate Angular and how to do smth with it :)

## What I Would Do Next

- **Testing** — add backend specs (minitest or RSpec) for API endpoints and model logic; add frontend unit tests and integration tests
- **Authentication** — add user accounts so authors are tied to logged-in users instead of free-text input
- **Edit/delete** — allow editing and deleting articles and comments
- **Pagination** — paginate the articles list for better performance with many records
- **Production database** — replace SQLite with PostgreSQL for more enrich funcionality if needed
- **WYSIWYG editor for body** - I guess, we can improve UX for authors, to allow create more complex articles
- **Validation** - we need to valid/verify content, for possible NSFW contect and smth like that


Also, I'd like to understand what we expect from business for this app, it's could lead to different way what we need to implement first:
more security or more speed, or smth else
