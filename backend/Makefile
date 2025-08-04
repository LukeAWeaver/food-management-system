.PHONY: generate migrate rebuild dev-up dev-down refresh

generate:
	npx prisma generate

migrate:
	docker compose exec backend npx prisma migrate dev --name updated

rebuild:
	docker compose down
	docker compose up --build

refresh: generate migrate rebuild

dev-up:
	docker compose up -d

dev-down:
	docker compose down
