CREATE TABLE "tasks" (
  id SERIAL PRIMARY KEY,
  task_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  priority TEXT NOT NULL,
  assigned_ user TEXT NOT NULL,
   finished_date DATE,
  completed BOOLEAN
 
);

INSERT INTO "tasks" ("task_name", "start_date", "end_date", "priority", "assigned_user", "finished_date", "completed")
VALUES ('Complete task 1', '2023-03-26', '2023-04-02', 'high', 'John Doe', '2023-06-14', false);

