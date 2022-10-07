CREATE TABLE "list" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (100) NOT NULL,
"completed" BOOLEAN DEFAULT FALSE);

INSERT INTO "list"
("task")
VALUES
('testing a new task');