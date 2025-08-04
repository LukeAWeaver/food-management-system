# FMS - Food Management System

FMS is a full-stack app designed to help users track snack and meal ingredients by expiration date. Web & Mobile compatible

## Stack
- React Native (via Expo) + Tamagui for cross-platform UI
- GraphQL + Apollo Client + NestJS
- Prisma ORM with PostgreSQL

## Features

- Add food items with expiration date, location, and usage type
- View snack or meal ingredient sorted by expiration date
- Cross-platform UI via Expo + Tamagui
- NestJS generated code-first schema

## Tech Stack
 ______________________________________________
/ Layer         | Tech                         \
|---------------|------------------------------|
| Frontend      | Expo, React Native, Tamagui  |
| State & API   | Apollo Client, GraphQL       |
| Backend       | NestJS, @nestjs/graphql      |
| Database      | Prisma ORM, PostgreSQL       |
 \---------------------------------------------/

## Setup

1. Clone the repo
2. Install frontend and backend dependencies
3. Update `.env` for database connection
4. Run `make refresh` to generate Prisma client, apply migrations, and rebuild backend
5. Run frontend with `npx expo start`
