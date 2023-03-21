CREATE TABLE "tasks" (
    id SERIAL PRIMARY KEY, 
    "task" VARCHAR(180) NOT NULL,
    "completed" BOOLEAN
);

INSERT INTO "tasks" ("task", "completed")
VALUES ('Do the laundry', false);